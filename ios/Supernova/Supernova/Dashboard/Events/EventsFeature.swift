//
//  EventsFeature.swift
//  Supernova
//
//  Created by Steven Sherry on 6/14/23.
//

import ComposableArchitecture

struct EventsFeature: ReducerProtocol {
    @Dependency(\.client.getEvents) var getEvents
    
    struct State: Equatable {
        var events: [Event]? = nil
        var credentials: Credentials? = nil
    }
    
    enum Action {
        case fetchEvents
        case eventsReceived([Event])
    }
    
    var body: some ReducerProtocolOf<Self> {
        Reduce { state, action in
            switch action {
            case .fetchEvents:
                return .run(priority: .userInitiated) { send in
                    let events = try await getEvents()
                    await send(.eventsReceived(events), animation: .linear)
                }
                
            case .eventsReceived(let events):
                state.events = events
                return .none
            }
        }
    }
}
