//
//  TextEntry.swift
//  SupabaseLogin
//
//  Created by Steven Sherry on 5/15/23.
//

import SwiftUI

protocol TextEntry: View {
    init(_ titleKey: LocalizedStringKey, text: Binding<String>, prompt: Text?)
}

extension TextField: TextEntry where Label == Text {}
extension SecureField: TextEntry where Label == Text {}

