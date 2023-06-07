//
//  Client.swift
//  Supernova
//
//  Created by Steven Sherry on 5/22/23.
//

import Foundation
import Supabase
import PostgREST
import Dependencies

private enum ClientKey: DependencyKey {
    static let liveValue: Client = {
        @Dependency(\.clientUrl) var url
        @Dependency(\.clientSecret) var secret
        
        let supabase = SupabaseClient(supabaseURL: url, supabaseKey: secret)

        return Client(
            signIn: { email, password in
                let session = try await supabase.auth.signIn(email: email, password: password)
                return (session.accessToken, session.refreshToken)
            },
            existingSession: {
                do {
                    let currentSession = try await supabase.auth.session
                    return (currentSession.accessToken, currentSession.refreshToken)
                } catch {
                    return nil
                }
            },
            signout: {
                try await supabase.auth.signOut()
            },
            getApps: {
                do {
                    let session = try await supabase.auth.session
                    return try await supabase.database.rpc(fn: "get_apps", params: ["employee_id": session.user.id])
                        .execute()
                        .value as [MiniApp]
                } catch let error {
                    print(error.localizedDescription)
                    return []
                }
            },
            getNewsFeed: {
                return try await supabase.database.from("newsfeed")
                    .execute()
                    .value as [NewsItem]
            },
            getEvents: {
                do {
                    let session = try await supabase.auth.session
                    return try await supabase.database.rpc(fn: "get_events", params: ["employee_id": session.user.id])
                        .execute()
                        .value as [Event]
                } catch let error {
                    print(error.localizedDescription)
                    return []
                }
            }
        )
    }()

    static let testValue: Client = {
        return Client(
            signIn: { email, password in
                print("Signed in \(email)")
                return ("accessToken", "refreshToken")
            },
            existingSession: {
                return ("accessToken", "refreshToken")
            },
            signout: { },
            getApps: {
                [
                    .init(
                        id: "time",
                        name: "Time Tracking"
                    ),
                    .init(
                        id: "hr",
                        name: "Human Resources"
                    ),
                    .init(
                        id: "perks",
                        name: "People Perks"
                    )
                ]
            },
            getNewsFeed: {
                [
                    .init(title: "Why Things Are Going Good", id: 0, body: ""),
                    .init(title: "New Product Release Cadence", id: 1, body: ""),
                    .init(title: "Changes to Our Benefits Plan", id: 2, body: ""),
                    .init(title: "How AI is Changing How We Work", id: 3, body: "")
                ]
            },
            getEvents: {
                [
                    .init(
                        title: "Perk received from William Perdue",
                        kind: .perks(1),
                        read: true
                    ),
                    .init(
                        title: "Timesheet Due on Tuesday 3/21",
                        kind: .time(2),
                        read: true
                    ),
                    .init(
                        title: "Timesheet Needs Changes",
                        kind: .time(4),
                        read: false
                    ),
                    .init(
                        title: "Timesheet Approved",
                        kind: .time(3),
                        read: false
                    ),
                    .init(
                        title: "PTO approved by Billy Hargrove",
                        kind: .hr(1),
                        read: false
                    )
                ]
            }
        )
    }()

    static let previewValue: Client = {
        // We want to be able to simulate network latency for the preview
        @Dependency(\.continuousClock) var clock
        
        var test = testValue
        var oldsignin = test.signIn
        var oldApps = test.getApps
        var oldEvents = test.getEvents
        var oldNews = test.getNewsFeed
        
        test.signIn = { email, password in
            try await clock.sleep(for: .seconds(1))
            return try await oldsignin(email, password)
        }
        
        test.getApps = {
            try await clock.sleep(for: .seconds(1))
            return try await oldApps()
        }
        
        test.getEvents = {
            try await clock.sleep(for: .seconds(1))
            return try await oldEvents()
        }
        
        test.getNewsFeed = {
            try await clock.sleep(for: .seconds(1))
            return try await oldNews()
        }
        
        return test
    }()
}

private enum ClientUrlKey: DependencyKey {
    static let liveValue: URL = "http://localhost:54321"
    static let testValue: URL = "http://asdf.com"
    static let previewValue = testValue
}

private enum ClientSecretKey: DependencyKey {
    static let liveValue = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
    static let testValue = "imalittletepot"
    static let previewValue = testValue
}

extension DependencyValues {
    var client: Client {
        get { self[ClientKey.self] }
        set { self[ClientKey.self] = newValue }
    }
    
    var clientUrl: URL {
        get { self[ClientUrlKey.self] }
        set { self[ClientUrlKey.self] = newValue }
    }
    
    var clientSecret: String {
        get { self[ClientSecretKey.self] }
        set { self[ClientSecretKey.self] = newValue }
    }
}


struct Client {
    var signIn: (_ email: String, _ password: String) async throws -> (acessToken: String, refreshToken: String)
    var existingSession: () async throws -> (accessToken: String, refreshToken: String)?
    var signout: () async throws -> Void
    var getApps: () async throws -> [MiniApp]
    var getNewsFeed: () async throws -> [NewsItem]
    var getEvents: () async throws -> [Event]
}
