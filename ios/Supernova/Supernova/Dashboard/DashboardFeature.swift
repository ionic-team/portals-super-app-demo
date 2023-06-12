//
//  DashboardFeature.swift
//  Supernova
//
//  Created by Steven Sherry on 5/23/23.
//

import ComposableArchitecture

typealias DashboardState = DashboardFeature.State
typealias DashboardAction = DashboardFeature.Action

struct DashboardFeature: ReducerProtocol {
    @Dependency(\.client.getApps) var getApps
    @Dependency(\.client.getNewsFeed) var getNewsFeed
    @Dependency(\.client.getEvents) var getEvents
    
    struct State: Equatable {
        var apps: [MiniApp]?
        var newsFeed: [NewsItem]?
        var events: [Event]?
        var credentials: Credentials?
        var path = StackState<MiniAppState>()
    }
    
    
    enum Action {
        case appsReceived([MiniApp])
        case newsFeedReceived([NewsItem])
        case eventsReceived([Event])
        case authorizedUser(Credentials?)
        case path(StackAction<MiniAppState, MiniAppAction>)
        case fetchAll
        case fetchApps
        case fetchNewsFeed
        case fetchEvents
        case reset
        case logoutButtonTapped
    }
    
    var body: some ReducerProtocolOf<Self> {
        Reduce { state, action in
            switch action {
            case .fetchAll:
                return .run(priority: .userInitiated) { send in
                    await send(.fetchApps)
                    await send(.fetchEvents)
                    await send(.fetchNewsFeed)
                }
                
            case .fetchEvents:
                return .run(priority: .userInitiated) { send in
                    print("getting events")
                    let events = try await getEvents()
                    await send(.eventsReceived(events), animation: .linear)
                }
                
            case .fetchApps:
                return .run(priority: .userInitiated) { send in
                    print("getting apps")
                    let apps = try await getApps()
                    await send(.appsReceived(apps), animation: .linear)
                }
                
            case .fetchNewsFeed:
                return .run(priority: .userInitiated) { send in
                    print("getting news")
                    let news = try await getNewsFeed()
                    await send(.newsFeedReceived(news), animation: .linear)
                }
                
            case let .appsReceived(apps):
                state.apps = apps
                return .none
                
            case let .newsFeedReceived(newsFeed):
                state.newsFeed = newsFeed
                return .none
                
            case let .eventsReceived(events):
                state.events = events
                return .none
                
            case let .authorizedUser(credentials):
                state.credentials = credentials
                return .none
                
            case .reset:
                state.apps = nil
                state.events = nil
                state.newsFeed = nil
                return .none
                
            case .path, .logoutButtonTapped:
                return .none
            }
        }
        .forEach(\.path, action: /Action.path) {
            MiniAppFeature()
        }
    }
}

