//
//  AppFeature.swift
//  Supernova
//
//  Created by Steven Sherry on 5/23/23.
//

import ComposableArchitecture

typealias AppAction = AppFeature.Action

struct AppFeature: ReducerProtocol {
    struct State: Equatable {
        var dashboardState: DashboardFeature.State = .init()
        var loginState: LoginFeature.State = .init()
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
        
        Reduce { state, action in
            switch action {
            case .loginAction(.loginSucceeded):
                return .run { await $0(.dashboardAction(.fetchAll)) }

            case .loginAction(.logout):
                return .run { await $0(.dashboardAction(.reset)) }
                
            default:
                return .none
            }
        }
    }
}
