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
        PortalManager.newPortal("time")
            .setStartDir("time-tracking")
            .create()

        // Human Resources Portal
        PortalManager.newPortal("hr")
            .setStartDir("human-resources")
            .create()

        // People Perks Portal
        PortalManager.newPortal("perks")
            .setStartDir("perks")
            .create()

        // CRM Portal
        PortalManager.newPortal("crm")
            .setStartDir("crm")
            .create()
    }
}