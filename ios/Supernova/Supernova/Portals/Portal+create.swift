//
//  Portal+create.swift
//  Supernova
//
//  Created by Steven Sherry on 5/23/23.
//

import Foundation
import Capacitor
import Dependencies
import IonicPortals

struct Credentials: Encodable {
    var url: URL
    var accessToken: String
    var refreshToken: String
    
    init(accessToken: String, refreshToken: String) {
        @Dependency(\.clientUrl) var url
        self.url = url
        self.accessToken = accessToken
        self.refreshToken = refreshToken
    }
}

extension Portal {
    private static let encoder = JSONEncoder()
    static func create(from app: MiniApp, with credentials: Credentials, and resourceId: UInt? = nil) -> Portal {
        let creds = (try? encoder.encodeJsObject(credentials)) ?? [:]
        var initialContext: [String: JSValue] = [
            "supabase": creds,
        ]

        if let resourceId = resourceId {
            initialContext["resourceId"] = Int(resourceId)
        }

        return Portal(
            name: app.id,
            initialContext: initialContext
        )
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
     resourceId: 1
   }
 }
 */
