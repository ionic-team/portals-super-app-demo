package io.ionic.superapp.ui.dashboard

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.faltenreich.skeletonlayout.Skeleton
import com.faltenreich.skeletonlayout.applySkeleton
import io.ionic.superapp.R
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class DashboardActivity : AppCompatActivity() {

    private lateinit var appSkeleton: Skeleton
    private lateinit var activitySkeleton: Skeleton
    private lateinit var newsFeedSkeleton: Skeleton

    private lateinit var dashboardViewModel: DashboardViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)

        val appList : RecyclerView = findViewById(R.id.dashboard_app_list)
        val activityList : RecyclerView = findViewById(R.id.recent_activity_list)
        val newsFeedList : RecyclerView = findViewById(R.id.newsfeed_list)

        appList.layoutManager = LinearLayoutManager(this)
        activityList.layoutManager = LinearLayoutManager(this)
        newsFeedList.layoutManager = LinearLayoutManager(this)

        dashboardViewModel = ViewModelProvider(this)[DashboardViewModel::class.java]


        appSkeleton = appList.applySkeleton(R.layout.app_row_item, 3)
        activitySkeleton = activityList.applySkeleton(R.layout.notification_row_item, 3)
        newsFeedSkeleton = newsFeedList.applySkeleton(R.layout.notification_row_item, 3)

        appSkeleton.showSkeleton()
        activitySkeleton.showSkeleton()
        newsFeedSkeleton.showSkeleton()

        CoroutineScope(Dispatchers.Main).launch {
            delay(5000L)
            appSkeleton.showOriginal()
            activitySkeleton.showOriginal()
            newsFeedSkeleton.showOriginal()
        }
    }
}