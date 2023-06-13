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
