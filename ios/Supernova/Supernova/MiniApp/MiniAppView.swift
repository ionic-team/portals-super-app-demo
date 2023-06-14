//
//  MiniAppView.swift
//  Supernova
//
//  Created by Steven Sherry on 6/1/23.
//

import Capacitor
import IonicPortals
import ComposableArchitecture
import SwiftUI

struct MiniAppView: View {
    let store: StoreOf<MiniAppFeature>
    
    var body: some View {
        WithViewStore(store) { vs in
            PortalView(
                portal: .create(from: vs.state) { @MainActor in
                    vs.send(.dismiss)
                } onLoad: { @MainActor in
                    vs.send(.fadeIn, animation: .linear(duration: 0.25))
                }
            )
            .onAppear { vs.send(.hideNavBar) }
            .toolbar(vs.hideNavBar ? .hidden : .automatic, for: .navigationBar)
            .ignoresSafeArea()
            .opacity(vs.fadeIn ? 1.0 : 0.0)
        }
    }
}
