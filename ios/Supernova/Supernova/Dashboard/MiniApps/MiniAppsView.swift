//
//  MiniAppsView.swift
//  Supernova
//
//  Created by Steven Sherry on 6/2/23.
//

import SwiftUI
import SkeletonUI
import ComposableArchitecture

struct MiniAppsView: View {
    var store: StoreOf<MiniAppsFeature>

    var body: some View {
        WithViewStore(store) { vs in
            if vs.apps?.count == 0 {
                Text("Nothing to see here")
            } else {
                SkeletonForEach(with: vs.apps ?? [], quantity: 2) { isLoading, app in
                    NavigationLink(state: MiniAppFeature.State(app: app, with: vs.credentials)) {
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
                        .alignmentGuide(.listRowSeparatorLeading) { dimension in
                            dimension[.leading]
                        }
                    }
                    .buttonStyle(.plain)
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
