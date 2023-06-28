package io.ionic.superapp.data

import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.exceptions.BadRequestRestException
import io.github.jan.supabase.gotrue.GoTrue
import io.github.jan.supabase.gotrue.gotrue
import io.github.jan.supabase.gotrue.providers.builtin.Email
import io.github.jan.supabase.gotrue.user.UserSession
import io.github.jan.supabase.postgrest.Postgrest
import io.github.jan.supabase.postgrest.postgrest
import io.github.jan.supabase.postgrest.rpc
import io.ionic.superapp.data.model.App
import io.ionic.superapp.data.model.Employee
import io.ionic.superapp.data.model.Event
import io.ionic.superapp.data.model.News
import org.json.JSONObject
import java.lang.Exception

class DataManager {
    val SUPABASE_URL = "http://10.0.2.2:54321"

    companion object {
        val instance = DataManager()
    }

    private val client: SupabaseClient = createSupabaseClient(
        supabaseUrl = SUPABASE_URL,
        supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
    ) {
        install(GoTrue)
        install(Postgrest)
    }

    private var session: UserSession? = null

    suspend fun login(email: String, password: String): Boolean {
        try {
            client.gotrue.loginWith(Email) {
                this.email = email
                this.password = password
            }
        } catch (e: Exception) {
            if (e is BadRequestRestException) {
                return false
            }
        }

        session = client.gotrue.currentSessionOrNull()
        return session != null
    }

    suspend fun getRecentActivity(): List<Event> {
        val userId = session?.user?.id
        if (userId != null) {
            return client.postgrest.rpc("get_events", Employee(employee_id = userId)).decodeList()
        } else {
            logout()
        }

        return emptyList()
    }

    suspend fun getNewsFeed(): List<News> {
        val userId = session?.user?.id
        if (userId != null) {
            return client.postgrest["newsfeed"].select().decodeList()
        } else {
            logout()
        }

        return emptyList()
    }

    suspend fun getApps(): List<App> {
        val appList = mutableListOf<App>()

        val userId = session?.user?.id
        if (userId != null) {
            return client.postgrest.rpc("get_apps", Employee(employee_id = userId)).decodeList()
        } else {
            logout()
        }

        return appList
    }

    fun getSessionObject(): JSONObject {
        val supabaseObject = JSONObject()
        session?.let {
            supabaseObject.put("url", SUPABASE_URL)
            supabaseObject.put("refreshToken", it.refreshToken)
            supabaseObject.put("accessToken", it.accessToken)
        }

        return supabaseObject
    }

    suspend fun logout() {
        client.gotrue.invalidateSession()
    }
}