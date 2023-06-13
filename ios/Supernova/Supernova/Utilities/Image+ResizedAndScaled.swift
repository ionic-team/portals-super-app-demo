//
//  Image+ResizedAndScaled.swift
//  Supernova
//
//  Created by Steven Sherry on 6/12/23.
//

import SwiftUI

extension Image {
    func resizableAndScaledToFit() -> some View {
        resizable()
            .scaledToFit()
    }
}

