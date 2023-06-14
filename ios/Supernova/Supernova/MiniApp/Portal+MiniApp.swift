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

    static func create(
        from selectedApp: MiniAppFeature.State,
        dismiss: @escaping () async -> Void,
        onLoad: @escaping () async -> Void
    ) -> Portal {
        let creds = (try? encoder.encodeJsObject(selectedApp.credentials)) ?? [:]
        var initialContext: [String: JSValue] = [
            "supabase": creds,
        ]

        if let resourceId = selectedApp.id {
            initialContext["resourceId"] = resourceId as NSNumber
        }

        return Portal(
            name: selectedApp.app.id,
            startDir: "portals/\(selectedApp.app.id)",
            initialContext: initialContext
        )
        .adding(Dismiss(dismiss: dismiss))
        .adding(WebVitalsPlugin { _, _ in Task.detached { await onLoad() } })
    }
}

private class Dismiss: CAPInstancePlugin, CAPBridgedPlugin {
    let jsName = "Dismiss"
    let identifier = "Dismiss"
    let pluginMethods: [CAPPluginMethod] = [
        .init(name: "dismiss", returnType: CAPPluginReturnPromise)
    ]
    
    private let _dismiss: () async -> Void
    
    init(dismiss: @escaping () async -> Void) {
        _dismiss = dismiss
        super.init()
    }
    
    @objc func dismiss(_ call: CAPPluginCall) {
        Task.detached { [weak self] in
            await self?._dismiss()
            call.resolve()
        }
    }
}

extension MiniAppFeature.State {
    init?(app: MiniApp?, with credentials: Credentials?, for id: UInt? = nil) {
        guard let app, let credentials else { return nil }
        self.init(app: app, credentials: credentials, id: id)
    }
}

