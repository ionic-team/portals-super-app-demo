//
//  NewsFeedFeature.swift
//  Supernova
//
//  Created by Steven Sherry on 6/14/23.
//

import ComposableArchitecture

struct NewsFeedFeature: ReducerProtocol {
    @Dependency(\.client.getNewsFeed) var getNewsFeed

    struct State: Equatable {
        var feed: [NewsItem]?
    }

    enum Action {
        case fetchNewsFeed
        case newsFeedReceived([NewsItem])
        case newsItemSelected(NewsItem)
    }

    var body: some ReducerProtocolOf<Self> {
        Reduce { state, action in
            switch action {
            case .fetchNewsFeed:
                return .run(priority: .userInitiated) { send in
                    let news = try await getNewsFeed()
                    await send(.newsFeedReceived(news), animation: .linear)
                }

            case .newsFeedReceived(let news):
                state.feed = news
                return .none

            case .newsItemSelected:
                return .none
            }
        }
    }
}
