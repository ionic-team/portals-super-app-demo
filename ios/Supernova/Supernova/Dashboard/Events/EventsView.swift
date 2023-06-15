//
//  EventsView.swift
//  Supernova
//
//  Created by Steven Sherry on 6/12/23.
//

import SwiftUI
import SkeletonUI
import ComposableArchitecture

struct EventsView: View {
    let store: StoreOf<EventsFeature>

    var body: some View {
        WithViewStore(store) { vs in
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
                    .alignmentGuide(.listRowSeparatorLeading) { dimension in
                        dimension[.leading]
                    }
                    .background(
                        NavigationLink(
                            state: MiniAppFeature.State(
                                app: event?.miniApp,
                                with: vs.credentials,
                                for: event?.kind.id
                            ),
                            label: {}
                        )
                        .opacity(0)
                    )
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
        case .crm:
            return .lock
        }
    }
}
