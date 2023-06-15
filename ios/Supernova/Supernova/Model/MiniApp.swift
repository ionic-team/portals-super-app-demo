//
//  MiniApp.swift
//  Supernova
//
//  Created by Steven Sherry on 5/23/23.
//

import Foundation
import SwiftUI

struct MiniApp: Identifiable, Hashable, Decodable {
    var id: String
    var name: String
    var appFlowId: String = ""

    enum CodingKeys: String, CodingKey {
        case id
        case name
        case appFlowId = "appflow_id"
    }
}
