//
//  LoginFeature.swift
//  Supernova
//
//  Created by Steven Sherry on 5/23/23.
//

import Foundation
import ComposableArchitecture
import Dependencies

struct LoginFeature: ReducerProtocol {
    @Dependency(\.client.signIn) var signin
    @Dependency(\.client.signout) var signout
    @Dependency(\.client.existingSession) var existingSession

    enum LoginStatus {
        case loggedOut, loggedIn, inProcess
    }

    struct State: Equatable {
        var loginStatus: LoginStatus = .inProcess
        var email: String = ""
        var password: String = ""

        var isLoggedOut: Bool {
            loginStatus == .loggedOut
        }
    }

    enum Action {
        case login
        case setEmail(String)
        case setPassword(String)
        case loginSucceeded(sessionToken: String, refreshToken: String)
        case loginFailed
        case logout
        case useCurrentSessionIfAvailable
    }

    var body: some ReducerProtocolOf<Self> {
        Reduce { state, action in
            switch action {
            case .setEmail(let email):
                state.email = email
                return .none

            case .setPassword(let password):
                state.password = password
                return .none

            case .login:
                if state.loginStatus == .inProcess { return .none }
                state.loginStatus = .inProcess
                return .run { [email = state.email, password = state.password] send in
                    do {
                        let (sessionToken, refreshToken) = try await signin(email, password)
                        await send(.loginSucceeded(sessionToken: sessionToken, refreshToken: refreshToken))
                    } catch {
                        await send(.loginFailed)
                    }
                }

            case .loginFailed:
                state.loginStatus = .loggedOut
                return .none

            case .loginSucceeded:
                state.loginStatus = .loggedIn
                return .none

            case .logout:
                state.loginStatus = .loggedOut
                state.password = ""
                state.email = ""
                return .run { _ in
                    try await signout()
                }

            case .useCurrentSessionIfAvailable:
                if state.loginStatus == .loggedIn { return .none }
                return .run { send in
                    guard let session = await existingSession() else {
                        return await send(.loginFailed)
                    }

                    await send(.loginSucceeded(sessionToken: session.accessToken, refreshToken: session.refreshToken))
                }
            }
        }
    }
}
