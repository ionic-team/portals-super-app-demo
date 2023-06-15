//
//  ContentView.swift
//  SupabaseLogin
//
//  Created by Steven Sherry on 5/2/23.
//

import SwiftUI
import Supabase
import ComposableArchitecture
import Dependencies

struct LoginView: View {
    let store: StoreOf<LoginFeature>

    var body: some View {
        WithViewStore(store) { vs in
            VStack {
                LoginLogo()
                    .padding([.top], 60)
                    .padding([.bottom], 64)

                VStack(alignment: .leading) {
                    Text("Log in")
                        .font(.system(size: 34, weight: .bold, design: .default))

                    LoginPair(
                        email: vs.binding(
                            get: \.email,
                            send: LoginFeature.Action.setEmail
                        ),
                        password: vs.binding(
                            get: \.password,
                            send: LoginFeature.Action.setPassword
                        )
                    )

                    Button {
                        vs.send(.login, animation: .linear)
                    } label: {
                        Group {
                            switch vs.loginStatus {
                            case .inProcess:
                                ProgressView()
                                    .tint(.white)
                            default:
                                Text("Login")
                            }
                        }
                        .frame(maxWidth: .infinity)
                        .frame(height: 35)
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(.superPrimary)
                    .padding([.top], 32)
                    .font(.system(size: 17, weight: .semibold, design: .rounded))
                }
                .padding([.leading, .trailing], 32)

                Spacer()
            }
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView(
            store: .init(
                initialState: .init(loginStatus: .loggedOut),
                reducer: LoginFeature()
            )
        )
    }
}

private struct LoginModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding([.bottom, .top], 8)
            .overlay(Rectangle().frame(height: 0.5), alignment: .bottom)
    }
}

private extension Image {
    func loginAccessory() -> some View {
        resizable()
            .aspectRatio(contentMode: .fit)
            .frame(width: 24, height: 24)
    }
}

private extension Text {
    func fieldPrompt() -> Text {
        font(.system(size: 17, weight: .regular, design: .rounded))
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
            HStack(spacing: 18) {
                Image.mail
                    .loginAccessory()

                TextField(
                    "Email",
                    text: $email,
                    prompt: Text("Email")
                        .fieldPrompt()
                )
                .keyboardType(.emailAddress)
            }
            .modifier(LoginModifier())

            Spacer()
                .frame(height: 20)

            HStack(spacing: 18) {
                Image.lock
                    .loginAccessory()

                SecureField(
                    "Password",
                    text: $password,
                    prompt: Text("Password")
                        .fieldPrompt()
                )
            }
            .modifier(LoginModifier())
        }
        .foregroundColor(.superGray)
    }
}
