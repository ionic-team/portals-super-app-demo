//
//  EventsView.swift
//  Supernova
//
//  Created by Steven Sherry on 6/12/23.
//

import SwiftUI
import SkeletonUI

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
