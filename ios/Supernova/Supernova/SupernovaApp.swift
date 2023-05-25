//
//  SupernovaApp.swift
//  Supernova
//
//  Created by Steven Sherry on 5/22/23.
//

import SwiftUI
import ComposableArchitecture

@main
struct SupernovaApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        WindowGroup {
            AppView(
                store: Store(initialState: .init()) {
                    AppFeature()
                }
            )
        }
    }
}

import Supabase

class AppDelegate: NSObject, UIApplicationDelegate {
    @Dependency(\.client.signout) var client
    func applicationWillTerminate(_ application: UIApplication) {
        Task { try await client() }
    }
}
