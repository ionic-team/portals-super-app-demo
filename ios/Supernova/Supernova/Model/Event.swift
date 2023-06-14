//
//  Event.swift
//  Supernova
//
//  Created by Steven Sherry on 5/23/23.
//

import Foundation
import SwiftUI

struct Event: Equatable {
    enum Kind: Equatable {
        case time(UInt), hr(UInt), perks(UInt)
        
        var id: UInt {
            switch self {
            case let .time(id):
                return id
            case let .hr(id):
                return id
            case let .perks(id):
                return id
            }
        }
        
        var type: String {
            switch self {
            case .time:
                return "time"
            case .hr:
                return "hr"
            case .perks:
                return "perks"
            }
        }
    }
    
    var title: String
    var kind: Kind
    var read: Bool
    var miniApp: MiniApp? = nil
}

extension Event: Identifiable {
    var id: String { "\(title)-\(kind.id)" }
}

extension Event: Codable {
    enum CodingKeys: CodingKey {
        case id, fk, type, read, description
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let type = try container.decode(String.self, forKey: .type)
        let fk = try container.decode(UInt.self, forKey: .fk)

        let kind: Kind
        
        switch type {
        case "time":
            kind = .time(fk)
        case "perks":
            kind = .perks(fk)
        case "hr":
            kind = .hr(fk)
        default:
            throw NSError()
        }
        
        self.kind = kind
        self.title = try container.decode(String.self, forKey: .description)
        self.read = try container.decode(Bool.self, forKey: .read)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(read, forKey: .read)
        try container.encode(title, forKey: .description)
        try container.encode(kind.id, forKey: .fk)
        try container.encode(kind.type, forKey: .type)
    }
}
