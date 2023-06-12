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
    }
    
    enum Action {
        case dismiss
    }
    
    func reduce(into state: inout State, action: Action) -> EffectTask<Action> {
        switch action {
        case .dismiss:
            return .run { _ in
                await dismiss()
            }
        }
    }
}

