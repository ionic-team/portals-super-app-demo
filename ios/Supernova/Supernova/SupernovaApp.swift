//
//  SupernovaApp.swift
//  Supernova
//
//  Created by Steven Sherry on 5/22/23.
//

import SwiftUI
import ComposableArchitecture
import IonicPortals
import Dependencies

@main
struct SupernovaApp: App {
    init() {
        PortalsRegistrationManager.shared.register(key: "YOUR_KEY_HERE")
    }

    var body: some Scene {
        WindowGroup {
            AppView(
                store: Store(initialState: .init()) {
                    AppFeature()
                        .dependency(\.clientUrl, "http://0.0.0.0:54321")
                }
            )
        }
    }
}
