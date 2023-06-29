//
//  DashboardView.swift
//  SupabaseLogin
//
//  Created by Steven Sherry on 5/15/23.
//

import SwiftUI
import ComposableArchitecture

struct DashboardView: View {
    let store: StoreOf<DashboardFeature>

    var body: some View {
        List {
            Section {
                MiniAppsView(
                    store: store.scope(
                        state: \.appsState,
                        action: DashboardFeature.Action.appsAction
                    )
                )
            }

            Section {
                EventsView(
                    store: store.scope(
                        state: \.eventsState,
                        action: DashboardFeature.Action.eventsAction
                    )
                )
            } header: {
                HStack {
                    Text("Recent Activity")
                        .font(.system(size: 22, weight: .bold))
                }
                .listRowInsets(EdgeInsets(top: 16, leading: 0, bottom: 8, trailing: 0))
            }

            Section {
                NewsFeedView(
                    store: store.scope(
                        state: \.newsState,
                        action: DashboardFeature.Action.newsAction
                    )
                )
            } header: {
                HStack {
                    Text("Newsfeed")
                        .font(.system(size: 22, weight: .bold))
                }
                .listRowInsets(EdgeInsets(top: 16, leading: 0, bottom: 8, trailing: 0))
            }
        }
        .listRowBackground(Color.pink)
        .background(Color.pink)
        .listStyle(.insetGrouped)
        .headerProminence(.increased)
        .navigationTitle("Dashboard")
        .sheet(store: store.scope(state: \.$newsItem, action: { .present($0) })) { store in
            NewsItemView(store: store)
                .padding([.top, .leading, .trailing])
        }
    }
}

struct DashboardView_Previews: PreviewProvider {
    static let store = Store(initialState: .init(), reducer: DashboardFeature())
    static var previews: some View {
        NavigationView {
            WithViewStore(store) { vs in
                DashboardView(store: store)
                    .task {
                        await vs.send(.fetchAll, animation: .linear).finish()
                    }
            }
        }
    }
}
