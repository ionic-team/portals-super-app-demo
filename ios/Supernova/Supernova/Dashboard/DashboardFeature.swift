//
//  DashboardFeature.swift
//  Supernova
//
//  Created by Steven Sherry on 5/23/23.
//

import ComposableArchitecture

struct DashboardFeature: ReducerProtocol {
    struct State: Equatable {
        var appsState = MiniAppsFeature.State()
        var newsState = NewsFeedFeature.State()
        var eventsState = EventsFeature.State()
        var path = StackState<MiniAppFeature.State>()
        @PresentationState
        var newsItem: NewsItem?
    }
    
    enum Action {
        case appsAction(MiniAppsFeature.Action)
        case newsAction(NewsFeedFeature.Action)
        case eventsAction(EventsFeature.Action)
        case authorizedUser(Credentials?)
        case path(StackAction<MiniAppFeature.State, MiniAppFeature.Action>)
        case present(PresentationAction<Never>)
        case fetchAll
        case reset
        case logoutButtonTapped
    }
    
    var body: some ReducerProtocolOf<Self> {
        Scope(state: \.appsState, action: /Action.appsAction) {
            MiniAppsFeature()
        }
        
        Scope(state: \.eventsState, action: /Action.eventsAction) {
            EventsFeature()
        }
        
        Scope(state: \.newsState, action: /Action.newsAction) {
            NewsFeedFeature()
        }
        
        Reduce { state, action in
            switch action {
            case .fetchAll:
                return .run(priority: .userInitiated) { send in
                    await send(.appsAction(.fetchApps))
                    await send(.eventsAction(.fetchEvents))
                    await send(.newsAction(.fetchNewsFeed))
                }
                
            case let .authorizedUser(credentials):
                state.appsState.credentials = credentials
                state.eventsState.credentials = credentials
                return .none
                
            case .reset:
                state.appsState = MiniAppsFeature.State()
                state.newsState = NewsFeedFeature.State()
                state.eventsState = EventsFeature.State()
                return .none
                
            case let .newsAction(.newsItemSelected(item)):
                state.newsItem = item
                return .none
                
            case .path, .logoutButtonTapped, .present, .appsAction, .eventsAction, .newsAction:
                return .none
            }
        }
        .forEach(\.path, action: /Action.path) {
            MiniAppFeature()
        }
        .ifLet(\.$newsItem, action: /Action.present) {
            NewsFeature()
        }
    }
}
