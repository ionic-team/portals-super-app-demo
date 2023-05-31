package io.ionic.superapp.data

import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.exceptions.BadRequestRestException
import io.github.jan.supabase.gotrue.GoTrue
import io.github.jan.supabase.gotrue.gotrue
import io.github.jan.supabase.gotrue.providers.builtin.Email
import io.github.jan.supabase.gotrue.user.UserSession
import java.lang.Exception

class DataManager {

    companion object {
        val instance = DataManager()
    }

    private val client: SupabaseClient = createSupabaseClient(
        supabaseUrl = "http://10.0.2.2:54321",
        supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU"
    ) {
        install(GoTrue) {
            // setting
        }
    }

    private var session: UserSession? = null

    suspend fun login(email: String, password: String): Boolean {
        try {
            val result = client.gotrue.loginWith(Email) {
                this.email = email
                this.password = password
            }
        } catch (e: Exception) {
            if (e is BadRequestRestException){
                return false
            }
        }

        session = client.gotrue.currentSessionOrNull()
        return session != null
    }
}