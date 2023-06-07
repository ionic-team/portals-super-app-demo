//
//  SupernovaApp.swift
//  Supernova
//
//  Created by Steven Sherry on 5/22/23.
//

import SwiftUI
import ComposableArchitecture
import IonicPortals

@main
struct SupernovaApp: App {
    init() {
        PortalsRegistrationManager.shared.register(key: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzMDU2ZjBlNC1kYTFkLTQ1YWMtYWJjZi1hNDg3MzMyZTQwNGYifQ.0H_gnwXCL1Z-GtFCwQ3J9YrybMxQO56CYo3PFGzoueB56DMvKT4jiQhLzhDYKEE5GwlqX-r0H_qklYKg_jtMyK9QZ_-kTNWi6LyjrJTcgFVwxjz27PZaqZPoKWyJLotSIbBhN8BF5flunCGW8kWL4_nY6FUmswatPDgcvyPmOydr9InbEHHDUVvi9mGwy_G78BjDrl9bThezpGRseBTOI7KH5FUdXwH9DCZJ2RC4_ukTNKMqaKFh-OcD8KDBUIdSP8GE0quO7zL4qSINvxMMzpupTdQKf3Td5B1mvLlrS4kF_8VPoQtvB8JqMrmH2fa8f31fCiz1EV4Wkngb_5yC7w")
    }

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
