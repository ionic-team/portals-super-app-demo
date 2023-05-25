//
//  AppView.swift
//  Supernova
//
//  Created by Steven Sherry on 5/23/23.
//

import SwiftUI
import ComposableArchitecture


struct AppView: View {
    let store: StoreOf<AppFeature>

    var body: some View {
        WithViewStore(store) { vs in
            NavigationView {
                DashboardView(store: store.scope(state: \.dashboardState, action: AppAction.dashboardAction))
                    .fullScreenCover(isPresented: .constant(vs.loginState.isLoggedOut)) {
                        LoginView(store: store.scope(state: \.loginState, action: AppAction.loginAction))
                    }
                    .toolbar {
                        Button("Log Out") {
                            vs.send(.loginAction(.logout))
                        }
                        .tint(Color.superPrimary)
                    }
                    .task { @MainActor in
                        vs.send(.loginAction(.useCurrentSessionIfAvailable))
                    }
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            AppView(
                store: Store(initialState: AppFeature.State()) {
                    AppFeature()
                }
            )
        }
    }
}
