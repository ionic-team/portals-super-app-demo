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
                portal: .create(from: vs.state) {
                    vs.sendOnMainThread(action: .dismiss)
                } onLoad: {
                    vs.sendOnMainThread(action: .fadeIn, animation: .linear(duration: 0.25))
                }
            ){$0.webView?.isInspectable = true}
            .onAppear { vs.send(.hideNavBar) }
            .toolbar(vs.hideNavBar ? .hidden : .automatic, for: .navigationBar)
            .ignoresSafeArea()
            .opacity(vs.fadeIn ? 1.0 : 0.0)
        }
    }
}

extension ViewStore {
    @MainActor
    @discardableResult
    func sendOnMainThread(action: ViewAction, animation: Animation? = nil) -> ViewStoreTask {
        send(action, animation: animation)
    }
}
