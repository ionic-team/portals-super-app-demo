//
//  Portal+MiniApp.swift
//  Supernova
//
//  Created by Steven Sherry on 6/2/23.
//

import Capacitor
import IonicPortals

extension Portal {
    private static let encoder = JSONEncoder()
    static func create(from selectedApp: MiniAppState, dismiss: @escaping @Sendable () async -> Void) -> Portal {
        let creds = (try? encoder.encodeJsObject(selectedApp.credentials)) ?? [:]
        var initialContext: [String: JSValue] = [
            "supabase": creds,
        ]

        if let resourceId = selectedApp.id {
            initialContext["resourceId"] = Int(resourceId)
        }

        return Portal(
            name: "webstub",
            initialContext: initialContext
        )
        .adding(Dismiss(dismiss: dismiss))
    }
}

/**
 {
   name: "whatever",
   value: {
     supabase: {
        url: whatever,
        accessToken: whatever,
        refreshToken: whatever,
     },
     resourceId: 1,
     role: "contractor"
   }
 }
 */

private class Dismiss: CAPInstancePlugin, CAPBridgedPlugin {
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

