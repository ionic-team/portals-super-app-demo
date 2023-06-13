//
//  DashboardView.swift
//  SupabaseLogin
//
//  Created by Steven Sherry on 5/15/23.
//

import SwiftUI
import SkeletonUI
import ComposableArchitecture

struct DashboardView: View {
    let store: StoreOf<DashboardFeature>
    
    var body: some View {
        WithViewStore(store) { vs in
            List {
                Section {
                    MiniAppsView(miniApps: vs.apps, credentials: vs.credentials)
                }
                
                Section {
                    EventsView(events: vs.events, credentials: vs.credentials)
                } header: {
                    HStack {
                        Text("Recent Activity")
                            .font(.system(size: 22, weight: .bold))
                    }
                    .listRowInsets(EdgeInsets(top: 16, leading: 0, bottom: 8, trailing: 0))
                }
                
                Section {
                    NewsFeedView(newsFeed: vs.newsFeed)
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

