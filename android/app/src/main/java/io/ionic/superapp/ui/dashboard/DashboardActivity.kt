package io.ionic.superapp.ui.dashboard

import android.app.UiModeManager
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.faltenreich.skeletonlayout.Skeleton
import com.faltenreich.skeletonlayout.applySkeleton
import io.ionic.superapp.R
import io.ionic.superapp.data.DataManager
import io.ionic.superapp.databinding.ActivityDashboardBinding
import io.ionic.superapp.ui.app.AppActivity
import io.ionic.superapp.ui.login.LoginActivity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch


class DashboardActivity : AppCompatActivity() {
    private lateinit var binding: ActivityDashboardBinding

    private lateinit var appSkeleton: Skeleton
    private lateinit var recentActivitySkeleton: Skeleton
    private lateinit var newsFeedSkeleton: Skeleton

    private lateinit var dashboardViewModel: DashboardViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityDashboardBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val appList = binding.dashboardAppList
        val recentActivityList = binding.recentActivityList
        val newsFeedList = binding.newsfeedList
        val logoutLink = binding.logoutLink

        appList.layoutManager = LinearLayoutManager(this)
        recentActivityList.layoutManager = LinearLayoutManager(this)
        newsFeedList.layoutManager = LinearLayoutManager(this)

        dashboardViewModel = ViewModelProvider(this)[DashboardViewModel::class.java]

        appSkeleton = appList.applySkeleton(R.layout.app_row_item, 3)
        recentActivitySkeleton = recentActivityList.applySkeleton(R.layout.notification_row_item, 3)
        newsFeedSkeleton = newsFeedList.applySkeleton(R.layout.notification_row_item, 3)

        dashboardViewModel.appList.observe(this, Observer {
            appSkeleton.showOriginal()
            appList.adapter = AppAdapter(it, this)
        })

        dashboardViewModel.eventList.observe(this, Observer {
            recentActivitySkeleton.showOriginal()
            recentActivityList.adapter = EventAdapter(it, this)
        })

        dashboardViewModel.newsList.observe(this, Observer {
            newsFeedSkeleton.showOriginal()
            newsFeedList.adapter = NewsAdapter(it, supportFragmentManager)
        })

        setSkeletonColors()

        appSkeleton.showSkeleton()
        recentActivitySkeleton.showSkeleton()
        newsFeedSkeleton.showSkeleton()

        logoutLink.setOnClickListener {
            CoroutineScope(Dispatchers.Main).launch {
                dashboardViewModel.logout()
                startActivity(Intent(this@DashboardActivity, LoginActivity::class.java))
                finish()
            }
        }

        CoroutineScope(Dispatchers.Main).launch {
            delay(1400L)
            dashboardViewModel.update()
        }
    }

    private fun setSkeletonColors() {
        val uiModeManager = getSystemService(UI_MODE_SERVICE) as UiModeManager
        val mode = uiModeManager.nightMode

        // Default skeleton colors
        var maskColor = Color.parseColor("#E0E0E0")
        var shimmerColor = Color.parseColor("#D5D5D5")

        // Dark mode skeleton colors
        if (mode == UiModeManager.MODE_NIGHT_YES) {
            maskColor = Color.DKGRAY
            shimmerColor = Color.GRAY
        }

        appSkeleton.maskColor = maskColor
        appSkeleton.shimmerColor = shimmerColor
        recentActivitySkeleton.maskColor = maskColor
        recentActivitySkeleton.shimmerColor = shimmerColor
        newsFeedSkeleton.maskColor = maskColor
        newsFeedSkeleton.shimmerColor = shimmerColor
    }
}