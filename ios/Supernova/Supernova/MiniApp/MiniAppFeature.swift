//
//  MiniAppFeature.swift
//  Supernova
//
//  Created by Steven Sherry on 6/1/23.
//

import ComposableArchitecture

typealias MiniAppState = MiniAppFeature.State
typealias MiniAppAction = MiniAppFeature.Action

struct MiniAppFeature: ReducerProtocol {
    @Dependency(\.dismiss) private var dismiss

    struct State: Equatable {
        let app: MiniApp
        let credentials: Credentials
        var id: UInt? = nil
        var hideNavBar = false
        var fadeIn = false
    }
    
    enum Action {
        case dismiss
        case hideNavBar
        case fadeIn
    }
    
    func reduce(into state: inout State, action: Action) -> EffectTask<Action> {
        switch action {
        case .dismiss:
            return .run { _ in
                await dismiss()
            }

        case .hideNavBar:
            state.hideNavBar = true
            return .none
            
        case .fadeIn:
            state.fadeIn = true
            return .none
        }
    }
}

