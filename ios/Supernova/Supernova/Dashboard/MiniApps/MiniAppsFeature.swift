//
//  MiniAppsFeature.swift
//  Supernova
//
//  Created by Steven Sherry on 6/14/23.
//

import ComposableArchitecture

struct MiniAppsFeature: ReducerProtocol {
    @Dependency(\.client.getApps) var getApps
    
    struct State: Equatable {
        var apps: [MiniApp]? = nil
        var credentials: Credentials? = nil
    }
    
    enum Action {
        case fetchApps
        case appsReceived([MiniApp])
    }
    
    var body: some ReducerProtocolOf<Self> {
        Reduce { state, action in
            switch action {
            case .fetchApps:
                return .run(priority: .userInitiated) { send in
                    let apps = try await getApps()
                    await send(.appsReceived(apps), animation: .linear)
                }
                
            case .appsReceived(let apps):
                state.apps = apps
                return .none
            }
        }
    }
}
