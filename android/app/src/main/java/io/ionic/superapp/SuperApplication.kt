package io.ionic.superapp

import android.app.Application
import io.ionic.portals.PortalManager
import java.util.*

class SuperApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        // Register Portals
        // PortalManager.register("YOUR_KEY_HERE")


        // Checkout Portal
//        PortalManager.newPortal("checkout")
//            .setStartDir("webapp")
//            .setPlugins(Arrays.asList(ShopAPIPlugin::class.java))
//            .create()

        // Help Portal
//        val initialContext = HashMap<String, String>()
//        initialContext["startingRoute"] = "/help"
//        PortalManager.newPortal("help")
//            .setStartDir("webapp")
//            .setInitialContext(initialContext)
//            .setPlugins(Arrays.asList(ShopAPIPlugin::class.java))
//            .setPortalFragmentType(FadePortalFragment::class.java)
//            .addAssetMap(AssetMap("images", "/shared/images", "/images"))
//            .create()

        // Profile Portal
//        val initialContextProfile = HashMap<String, String>()
//        initialContextProfile["startingRoute"] = "/user"
//        PortalManager.newPortal("profile")
//            .setStartDir("webapp")
//            .addPlugin(ShopAPIPlugin::class.java)
//            .addPlugin(CameraPlugin::class.java)
//            .setInitialContext(initialContextProfile)
//            .create()
    }
}