package io.ionic.superapp.ui.dashboard

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.faltenreich.skeletonlayout.Skeleton
import com.faltenreich.skeletonlayout.applySkeleton
import io.ionic.superapp.R
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class DashboardActivity : AppCompatActivity() {
    private lateinit var appSkeleton: Skeleton
    private lateinit var recentActivitySkeleton: Skeleton
    private lateinit var newsFeedSkeleton: Skeleton

    private lateinit var dashboardViewModel: DashboardViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)

        val appList : RecyclerView = findViewById(R.id.dashboard_app_list)
        val recentActivityList : RecyclerView = findViewById(R.id.recent_activity_list)
        val newsFeedList : RecyclerView = findViewById(R.id.newsfeed_list)

        appList.layoutManager = LinearLayoutManager(this)
        recentActivityList.layoutManager = LinearLayoutManager(this)
        newsFeedList.layoutManager = LinearLayoutManager(this)

        dashboardViewModel = ViewModelProvider(this)[DashboardViewModel::class.java]

        appSkeleton = appList.applySkeleton(R.layout.app_row_item, 3)
        recentActivitySkeleton = recentActivityList.applySkeleton(R.layout.notification_row_item, 3)
        newsFeedSkeleton = newsFeedList.applySkeleton(R.layout.notification_row_item, 3)

        dashboardViewModel.appList.observe(this, Observer {
            appSkeleton.showOriginal()
            appList.adapter = AppAdapter(it)
        })

        dashboardViewModel.eventList.observe(this, Observer {
            recentActivitySkeleton.showOriginal()
            recentActivityList.adapter = EventAdapter(it)
        })

        dashboardViewModel.newsList.observe(this, Observer {
            newsFeedSkeleton.showOriginal()
            newsFeedList.adapter = NewsAdapter(it)
        })

        appSkeleton.showSkeleton()
        recentActivitySkeleton.showSkeleton()
        newsFeedSkeleton.showSkeleton()

        CoroutineScope(Dispatchers.Main).launch {
            dashboardViewModel.update()
        }
    }
}