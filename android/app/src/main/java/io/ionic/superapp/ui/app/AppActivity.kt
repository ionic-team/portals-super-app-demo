package io.ionic.superapp.ui.app

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.FragmentManager
import io.ionic.portals.Portal
import io.ionic.portals.PortalFragment
import io.ionic.portals.PortalManager
import io.ionic.superapp.R
import io.ionic.superapp.data.DataManager
import java.util.HashMap

class AppActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_app)

        val portalName = intent.extras?.getString("portalName")
        val eventId = intent.extras?.getString("eventId")

        if (portalName != null) {
            val portal: Portal = PortalManager.getPortal(portalName)
            val portalFragment = PortalFragment(portal)

            val initialContext = portal.initialContext as HashMap<String, String>
            initialContext.putAll(DataManager.instance.getSessionObject())

            if(!eventId.isNullOrEmpty()) {
                initialContext["eventId"] = eventId
                portalFragment.setInitialContext(initialContext)
            }

            val fragmentManager: FragmentManager = supportFragmentManager
            fragmentManager.beginTransaction().replace(R.id.portalFrame, portalFragment).commit()
        } else {
            Toast.makeText(this, "Problem loading the app!", Toast.LENGTH_LONG).show()
            finish()
        }
    }
}