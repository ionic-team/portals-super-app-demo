//
//  Extensions.swift
//  SupabaseLogin
//
//  Created by Steven Sherry on 5/15/23.
//

import Foundation
import SwiftUI
import Supabase

extension Color {
    static let superPrimary = Color(red: 253/255, green: 104/255, blue: 106/255)
    static let superGold = Color(red: 251/255, green: 184/255, blue: 44/255)
    static let superForest = Color(red: 16/255, green: 81/255, blue: 82/255)
    static let superTeal = Color(red: 0, green: 193/255, blue: 186/255)
    static let superGray = Color(red: 146/255, green: 160/255, blue: 179/255)
}

extension URL: ExpressibleByStringLiteral {
    public init(stringLiteral value: String) {
        guard let url = URL(string: value) else { fatalError("Invalid URL string provided") }
        self = url
    }
}

extension SupabaseClient {
    static let live: SupabaseClient = {
        SupabaseClient(supabaseURL: "http://localhost:542321", supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0")
    }()
}
