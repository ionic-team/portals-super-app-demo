package io.ionic.superapp

import android.app.Application
import io.ionic.portals.PortalManager
import io.ionic.superapp.data.DataManager
import java.util.*
import kotlin.collections.HashMap

class SuperApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        // Register Portals
        PortalManager.register("YOUR_PORTALS_KEY")

        // Time Tracking Portal
        val timeContext = HashMap<String, String>()
        timeContext["startingRoute"] = "/time"
        PortalManager.newPortal("time")
            .setStartDir("webapp")
            .setInitialContext(timeContext)
            .create()

        // Human Resources Portal
        val hrContext = HashMap<String, String>()
        hrContext["startingRoute"] = "/hr"
        PortalManager.newPortal("hr")
            .setStartDir("webapp")
            .setInitialContext(hrContext)
            .create()

        // People Perks Portal
        val perksContext = HashMap<String, String>()
        perksContext["startingRoute"] = "/perks"
        PortalManager.newPortal("perks")
            .setStartDir("webapp")
            .setInitialContext(perksContext)
            .create()
    }
}