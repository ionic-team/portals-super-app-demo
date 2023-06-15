//
//  AppFeature.swift
//  Supernova
//
//  Created by Steven Sherry on 5/23/23.
//

import ComposableArchitecture

struct AppFeature: ReducerProtocol {
    struct State: Equatable {
        var dashboardState = DashboardFeature.State()
        var loginState = LoginFeature.State()
    }

    enum Action {
        case loginAction(LoginFeature.Action)
        case dashboardAction(DashboardFeature.Action)
    }

    var body: some ReducerProtocolOf<AppFeature> {
        Scope(state: \.dashboardState, action: /Action.dashboardAction) {
            DashboardFeature()
        }

        Scope(state: \.loginState, action: /Action.loginAction) {
            LoginFeature()
        }

        Reduce { _, action in
            switch action {
            case .loginAction(.loginSucceeded(let accessToken, let refreshToken)):
                let credentials = Credentials(accessToken: accessToken, refreshToken: refreshToken)
                return .run { send in
                    await send(.dashboardAction(.authorizedUser(credentials)))
                    await send(.dashboardAction(.fetchAll))
                }

            case .loginAction(.logout):
                return .run { send in
                    await send(.dashboardAction(.authorizedUser(nil)))
                    await send(.dashboardAction(.reset))
                }

            case .dashboardAction(.logoutButtonTapped):
                return .run { send in
                    await send(.loginAction(.logout))
                }

            default:
                return .none
            }
        }
    }
}
