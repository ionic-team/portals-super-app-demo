//
//  NewsFeature.swift
//  Supernova
//
//  Created by Steven Sherry on 6/13/23.
//

import ComposableArchitecture

struct NewsFeature: ReducerProtocol {
    typealias State = NewsItem
    typealias Action = Never

    func reduce(into state: inout NewsItem, action: Never) -> EffectTask<Never> {}
}
