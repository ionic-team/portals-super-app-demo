//
//  DashboardView.swift
//  SupabaseLogin
//
//  Created by Steven Sherry on 5/15/23.
//

import SwiftUI

struct MiniApp: Identifiable {
    var id: String { name }
    var name: String
    var symbol: Image
    var color: Color
    var portalName: String
}

extension Image {
    static var timeTracking: Image {
        Image("ionicon_time")
    }
    
    static var hr: Image {
        Image("ionicon_people")
    }
    
    static var perks: Image {
        Image("ionicon_sparkles")
    }
    
    static var news: Image {
        Image("ionicon_newspaper")
    }
    
    static var chevron: Image {
        Image("ionicon_chevron")
    }
}

let apps: [MiniApp] = [
    .init(
        name: "Time Tracking",
        symbol: .timeTracking,
        color: .superPrimary,
        portalName: "time"
    ),
    .init(
        name: "Human Resources",
        symbol: .hr,
        color: .superTeal,
        portalName: "hr"
    ),
    .init(
        name: "People Perks",
        symbol: .perks,
        color: .superGold,
        portalName: "perks"
    )
]

struct Event {
    enum Kind {
        case time(UInt), hr(UInt), perks(UInt)
        
        var id: UInt {
            switch self {
            case let .time(id):
                return id
            case let .hr(id):
                return id
            case let .perks(id):
                return id
            }
        }
        
        var image: Image {
            switch self {
            case .time:
                return .timeTracking
            case .hr:
                return .hr
            case .perks:
                return .perks
            }
        }
    }
    
    var title: String
    var kind: Kind
    var read: Bool
}

extension Event: Identifiable {
    var id: String { "\(title)-\(kind.id)" }
}

let events: [Event] = [
    .init(
        title: "Perk received from William Perdue",
        kind: .perks(1),
        read: true
    ),
    .init(
        title: "Timesheet Due on Tuesday 3/21",
        kind: .time(2),
        read: true
    ),
    .init(
        title: "Timesheet Needs Changes",
        kind: .time(4),
        read: false
    ),
    .init(
        title: "Timesheet Approved",
        kind: .time(3),
        read: false
    ),
    .init(
        title: "PTO approved by Billy Hargrove",
        kind: .hr(1),
        read: false
    )
]

struct NewsItem: Identifiable {
    var title: String
    var id: UInt
}

let newsFeed: [NewsItem] = [
    .init(title: "Why Things Are Going Good", id: 0),
    .init(title: "New Product Release Cadence", id: 1),
    .init(title: "Changes to Our Benefits Plan", id: 2),
    .init(title: "How AI is Changing How We Work", id: 3)
]

struct DashboardView: View {
    var body: some View {
        List {
            Section {
                ForEach(apps) { app in
                    NavigationLink {
                        Text(app.portalName)
                    } label: {
                        HStack(spacing: 0) {
                            app.symbol
                                .resizable()
                                .scaledToFit()
                                .foregroundColor(app.color)
                                .frame(width: 32, height: 32)
                            Spacer()
                                .frame(minWidth: 8, maxWidth: 23)
                            Text(app.name)
                                .font(.system(size: 17, weight: .semibold))
                        }
                    }
                    .padding([.top, .bottom], 3)
                    .alignmentGuide(.listRowSeparatorLeading) { d in
                        d[.leading]
                    }
                }
            }
            
            Section {
                ForEach(events) { event in
                    HStack(spacing: 0) {
                        event.kind.image
                            .resizable()
                            .scaledToFit()
                            .frame(width: 20, height: 20)
                            .foregroundColor(event.read ? .primary.opacity(0.3) : .primary)
                        
                        Spacer()
                            .frame(minWidth: 8, maxWidth: 12)
                        
                        Text(event.title)
                            .font(.system(size: 17, weight: .regular))
                            .foregroundColor(event.read ? .primary.opacity(0.6) : .primary)
                    }
                    .frame(height: 36)
                    .alignmentGuide(.listRowSeparatorLeading) { d in
                        d[.leading]
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
                ForEach(newsFeed) { item in
                    HStack(spacing: 0) {
                        Image.news
                            .resizable()
                            .scaledToFit()
                            .frame(width: 20, height: 20)
                        
                        Spacer()
                            .frame(minWidth: 8, maxWidth: 12)
                        
                        Text(item.title)
                    }
                    .frame(maxHeight: 46)
                    .alignmentGuide(.listRowSeparatorLeading) { d in
                        d[.leading]
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

struct DashboardView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            DashboardView()
        }
    }
}
