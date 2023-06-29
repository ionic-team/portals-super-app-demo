//
//  Credentials.swift
//  Supernova
//
//  Created by Steven Sherry on 6/2/23.
//

import Foundation
import Dependencies

struct Credentials: Encodable, Hashable {
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
