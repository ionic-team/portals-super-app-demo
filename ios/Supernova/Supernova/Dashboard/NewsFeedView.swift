//
//  NewsFeedView.swift
//  Supernova
//
//  Created by Steven Sherry on 6/12/23.
//

import SwiftUI
import SkeletonUI

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
