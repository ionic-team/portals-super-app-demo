//
//  URL+ExprByStringLiteral.swift
//  Supernova
//
//  Created by Steven Sherry on 6/2/23.
//

import Foundation

extension URL: ExpressibleByStringLiteral {
    public init(stringLiteral value: String) {
        guard let url = URL(string: value) else { fatalError("Invalid URL string provided") }
        self = url
    }
}
