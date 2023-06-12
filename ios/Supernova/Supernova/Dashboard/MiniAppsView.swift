//
//  MiniAppsView.swift
//  Supernova
//
//  Created by Steven Sherry on 6/2/23.
//

import SwiftUI
import SkeletonUI

struct MiniAppsView: View {
    let miniApps: [MiniApp]?
    let credentials: Credentials?
    
    var body: some View {
        if miniApps?.count == 0 {
            Text("Nothing to see here")
        } else {
            SkeletonForEach(with: miniApps ?? [], quantity: 3) { isLoading, app in
                NavigationLink(state: MiniAppState(app: app, with: credentials)) {
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
                    .padding([.top, .bottom], 3)
                    .alignmentGuide(.listRowSeparatorLeading) { d in
                        d[.leading]
                    }
                }
            }
        }
    }
}

struct EventsView: View {
    let events: [Event]?
    let credentials: Credentials?
    
    var body: some View {
        if events?.count == 0 {
            Text("All caught up 🎉")
        } else {
            SkeletonForEach(with: events ?? [], quantity: 5) { isLoading, event in
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
    }
}

struct NewsFeedView: View {
    let newsFeed: [NewsItem]?
    
    var body: some View {
        if newsFeed?.count == 0 {
            Text("No news to catch up on 😴")
        } else {
            SkeletonForEach(with: newsFeed ?? [], quantity: 5) { isLoading, item in
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
    }
}
