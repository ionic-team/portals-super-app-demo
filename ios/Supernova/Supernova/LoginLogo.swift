//
//  LoginLogo.swift
//  SupabaseLogin
//
//  Created by Steven Sherry on 5/15/23.
//

import SwiftUI

struct LoginLogo: View {
    var body: some View {
        Circle()
            .frame(width: 128, height: 128)
            .foregroundColor(.superPrimary)
            .opacity(0.1)
            .overlay {
                Image("supernova-primary-logo")
                    .resizable()
                    .frame(width: 76.8, height: 76.8)
            }
    }
}

