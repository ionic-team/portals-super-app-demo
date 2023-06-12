//
//  MiniAppView.swift
//  Supernova
//
//  Created by Steven Sherry on 6/1/23.
//

import Capacitor
import IonicPortals
import ComposableArchitecture
import SwiftUI

struct MiniAppView: View {
    let store: StoreOf<MiniAppFeature>
    
    var body: some View {
        WithViewStore(store) { vs in
            PortalView(
                portal: .create(from: vs.state) {
                    let task = await MainActor.run { vs.send(.dismiss) }
                    await task.finish()
                }
                
            ){
                $0.webView?.isInspectable = true
            }
            .navigationBarBackButtonHidden(true)
            .ignoresSafeArea()
        }
    }
}


