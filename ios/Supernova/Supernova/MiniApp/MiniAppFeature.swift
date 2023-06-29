//
//  MiniAppFeature.swift
//  Supernova
//
//  Created by Steven Sherry on 6/1/23.
//

import ComposableArchitecture

struct MiniAppFeature: ReducerProtocol {
    @Dependency(\.dismiss) private var dismiss

    struct State: Equatable {
        let app: MiniApp
        let credentials: Credentials
        var id: UInt?
        var hideNavBar = false
        var fadeIn = true
        var showSpinner = false
    }

    enum Action {
        case dismiss
        case hideNavBar
        case showSpinner
        case fadeIn
    }

    func reduce(into state: inout State, action: Action) -> EffectTask<Action> {
        switch action {
        case .dismiss:
            return .run { _ in
                await dismiss()
            }

        case .showSpinner:
            state.showSpinner = true
            state.fadeIn = false
            return .none

        case .hideNavBar:
            state.hideNavBar = true
            return .none

        case .fadeIn:
            state.fadeIn = true
            state.showSpinner = false
            return .none
        }
    }
}

extension MiniAppFeature.State {
    init?(app: MiniApp?, with credentials: Credentials?, for id: UInt? = nil) {
        guard let app, let credentials else { return nil }
        self.init(app: app, credentials: credentials, id: id)
    }
}
