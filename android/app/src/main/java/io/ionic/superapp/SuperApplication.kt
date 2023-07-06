package io.ionic.superapp

import android.app.Application
import io.ionic.portals.PortalManager

class SuperApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        // Register Portals
        PortalManager.register("YOUR_PORTALS_KEY")
    }
}