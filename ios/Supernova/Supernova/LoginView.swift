//
//  ContentView.swift
//  SupabaseLogin
//
//  Created by Steven Sherry on 5/2/23.
//

import SwiftUI
import Supabase

struct LoginField: View {
    private let textEntryView: AnyView
    private let accessoryIconName: String
    
    init<T: TextEntry>(textEntryType: T.Type, title: LocalizedStringKey, accessoryIconName: String, fieldValue: Binding<String>) {
        self.textEntryView = AnyView(
            textEntryType.init(
                title,
                text: fieldValue,
                prompt: Text(title)
                    .foregroundColor(.superGray)
                    .font(.system(size: 17, weight: .regular, design: .rounded))
            )
        )
        self.accessoryIconName = accessoryIconName
        
    }
    
    var body: some View {
        VStack {
            HStack {
                Image(systemName: accessoryIconName)
                    .frame(width: 24, height: 24)
                textEntryView
            }
            .padding([.bottom, .top], 8)
            .overlay(Divider().overlay(Color.superGray), alignment: .bottom)
        }
    }
}

struct LoginPair: View {
    @Binding private var email: String
    @Binding private var password: String

    init(email: Binding<String>, password: Binding<String>) {
        self._email = email
        self._password = password
    }

    var body: some View {
        VStack {
            LoginField(
                textEntryType: TextField.self,
                title: "Email",
                accessoryIconName: "envelope",
                fieldValue: $email
            )
            .keyboardType(.emailAddress)
           
            Spacer()
                .frame(height: 20)
            
            LoginField(
                textEntryType: SecureField.self,
                title: "Password",
                accessoryIconName: "lock",
                fieldValue: $password
            )
        }
        .foregroundColor(.superGray)
    }
}

struct LoginView: View {
    @State private var email: String = ""
    @State private var password: String = ""
    var body: some View {
        VStack {
            LoginLogo()
                .padding([.top], 60)
                .padding([.bottom], 64)
            VStack(alignment: .leading) {
                Text("Log in")
                    .font(.system(size: 34, weight: .bold, design: .default))
                
                LoginPair(email: $email, password: $password)
                
                Button {
                    Task {
                        do {
                            let result = try await SupabaseClient.live.auth.signIn(email: email.lowercased(), password: password)
                            print(result.user.email as Any, "Successfully signed in")
                        } catch let error {
                            print(error.localizedDescription)
                        }
                    }
                } label: {
                    Text("Login")
                        .frame(maxWidth: .infinity)
                        .frame(height: 35)
                }
                .buttonStyle(.borderedProminent)
                .tint(.superPrimary)
                .padding([.top], 32)
                .font(.system(size: 17, weight: .semibold, design: .rounded))
            }
            .padding([.leading, .trailing], 24)
            
            Spacer()
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}
