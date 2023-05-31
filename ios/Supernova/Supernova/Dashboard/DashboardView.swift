//
//  DashboardView.swift
//  SupabaseLogin
//
//  Created by Steven Sherry on 5/15/23.
//

import SwiftUI
import Dependencies
import SkeletonUI
import ComposableArchitecture

struct DashboardView: View {
    let store: StoreOf<DashboardFeature>
    
    var body: some View {
        WithViewStore(store) { vs in
            List {
                Section {
                    if vs.apps?.count == 0 {
                        Text("Nothing to see here")
                    } else {
                        SkeletonForEach(with: vs.apps ?? [], quantity: 2) { isLoading, app in
                            NavigationLink {
                                Text(app?.id ?? "")
                            } label: {
                                HStack(spacing: 0) {
                                    Group {
                                        if let app = app {
                                            app.symbol
                                        } else {
                                            RoundedRectangle(cornerRadius: 2, style: .continuous)
                                                .skeleton(with: isLoading)
                                                .shape(type: .rounded(.radius(5, style: .continuous)))
                                        }
                                    }
                                    .frame(width: 32, height: 32)
                                    
                                    Spacer()
                                        .frame(minWidth: 8, maxWidth: 23)
                                    Text(app?.name ?? "")
                                        .skeleton(with: isLoading)
                                        .frame(maxHeight: isLoading ? 32 : .infinity)
                                        .font(.system(size: 17, weight: .semibold))
                                }
                            }
                            .padding([.top, .bottom], 3)
                            .alignmentGuide(.listRowSeparatorLeading) { d in
                                d[.leading]
                            }
                        }
                    }
                }
                
                Section {
                    if vs.events?.count == 0 {
                       Text("All caught up 🎉")
                    } else {
                        SkeletonForEach(with: vs.events ?? [], quantity: 5) { isLoading, event in
                            HStack(spacing: 0) {
                                Group {
                                    if let event = event {
                                        event.image
                                            .resizableAndScaledToFit()
                                            .foregroundColor(event.read ? .primary.opacity(0.3) : .primary)
                                    } else {
                                        Rectangle()
                                            .skeleton(with: isLoading)
                                            .shape(type: .rounded(.radius(5, style: .continuous)))
                                    }
                                }
                                .frame(width: 20, height: 20)
                                
                                Spacer()
                                    .frame(minWidth: 8, maxWidth: 12)
                                
                                Text(event?.title)
                                    .skeleton(with: isLoading)
                                    .frame(maxHeight: isLoading ? 20 : .infinity)
                                    .font(.system(size: 17, weight: .regular))
                                    .foregroundColor(event?.read ?? false ? .primary.opacity(0.6) : .primary)
                            }
                            .frame(height: 36)
                            .alignmentGuide(.listRowSeparatorLeading) { d in
                                d[.leading]
                            }
                        }
                    }
                } header: {
                    HStack {
                        Text("Recent Activity")
                            .font(.system(size: 22, weight: .bold))
                        
                        Spacer()
                        
                        NavigationLink {
                            Text("Hello")
                        } label: {
                            HStack(spacing: 7) {
                                Text("See all")
                                Image.chevron
                            }
                            .foregroundColor(.superPrimary)
                        }
                        .font(.system(size: 15, weight: .medium))
                    }
                    .listRowInsets(EdgeInsets(top: 16, leading: 0, bottom: 8, trailing: 0))
                }
                
                Section {
                    if vs.newsFeed?.count == 0 {
                        Text("No news to catch up on 😴")
                    } else {
                        SkeletonForEach(with: vs.newsFeed ?? [], quantity: 5) { isLoading, item in
                            HStack(spacing: 0) {
                                Image.news
                                    .resizableAndScaledToFit()
                                    .frame(width: 20, height: 20)
                                
                                Spacer()
                                    .frame(minWidth: 8, maxWidth: 12)
                                
                                Text(item?.title)
                                    .skeleton(with: isLoading)
                                    .shape(type: .rounded(.radius(20, style: .continuous)))
                                    .frame(maxHeight: isLoading ? 20 : .infinity)
                            }
                            .frame(maxHeight: 46)
                            .alignmentGuide(.listRowSeparatorLeading) { d in
                                d[.leading]
                            }
                        }
                    }
                } header: {
                    HStack {
                        Text("Newsfeed")
                        
                        Spacer()
                        
                        NavigationLink {
                            Text("Hello")
                        } label: {
                            HStack(spacing: 7) {
                                Text("See all")
                                Image.chevron
                            }
                            .foregroundColor(.superPrimary)
                        }
                        .font(.system(size: 15, weight: .medium))
                        
                    }
                    .listRowInsets(EdgeInsets(top: 16, leading: 0, bottom: 8, trailing: 0))
                }
            }
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

extension MiniApp {
    @ViewBuilder
    var symbol: some View {
        switch id {
        case "hr":
            Image.hr
                .resizableAndScaledToFit()
                .foregroundColor(.superTeal)
        case "perks":
            Image.perks
                .resizableAndScaledToFit()
                .foregroundColor(.superGold)
        case "time":
            Image.timeTracking
                .resizableAndScaledToFit()
                .foregroundColor(.superPrimary)
        default:
            Image(systemName: "nosign.app")
                .resizableAndScaledToFit()
                .foregroundColor(.superPrimary)
        }
    }
}

extension Event {
    var image: Image {
        switch kind {
        case .time:
            return .timeTracking
        case .hr:
            return .hr
        case .perks:
            return .perks
        }
    }
}

extension Image {
    func resizableAndScaledToFit() -> some View {
        resizable()
            .scaledToFit()
    }
}
