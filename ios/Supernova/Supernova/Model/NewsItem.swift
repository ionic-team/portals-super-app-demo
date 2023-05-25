//
//  NewsItem.swift
//  Supernova
//
//  Created by Steven Sherry on 5/23/23.
//

struct NewsItem: Identifiable, Equatable, Decodable {
    enum CodingKeys: String, CodingKey {
        case id
        case title = "headline"
    }

    var title: String
    var id: UInt
}
