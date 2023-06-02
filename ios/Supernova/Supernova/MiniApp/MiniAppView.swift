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

extension Portal {
    static func create(from selectedApp: MiniAppState) -> Portal {
        create(from: selectedApp.app, with: selectedApp.credentials, and: selectedApp.id)
    }
}

struct MiniAppView: View {
    let store: StoreOf<MiniAppFeature>
    
    var body: some View {
        WithViewStore(store) { vs in
            PortalView(
                portal: .create(from: vs.state)
                    .adding(Dismiss {
                        Task {
                            await MainActor.run {
                                vs.send(.dismiss).finish
                            }()
                        }
                    })
            )
            .navigationBarBackButtonHidden(true)
            .task {
                try? await Task.sleep(for: .seconds(3))
                await MainActor.run { vs.send(.dismiss).finish }()
            }
            .navigationTitle(vs.app.name)
        }
    }
}

class Dismiss: CAPInstancePlugin, CAPBridgedPlugin {
    let jsName = "Dismiss"
    let identifier = "DismissPlugin"
    let pluginMethods: [CAPPluginMethod] = [
        .init(name: "dismiss", returnType: CAPPluginReturnPromise)
    ]
    
    private let _dismiss: () async -> Void
    
    init(dismiss: @escaping @Sendable () async -> Void) {
        _dismiss = dismiss
        super.init()
    }
    
    @objc func dismiss(_ call: CAPPluginCall) {
        Task {
            await _dismiss()
            call.resolve()
        }
    }
}

extension MiniAppState {
    init?(app: MiniApp?, with credentials: Credentials?, for id: UInt? = nil) {
        guard let app, let credentials else { return nil }
        self.init(app: app, credentials: credentials, id: id)
    }
}
