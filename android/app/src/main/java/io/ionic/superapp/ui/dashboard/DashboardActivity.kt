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
import io.ionic.superapp.databinding.ActivityDashboardBinding
import io.ionic.superapp.databinding.ActivityLoginBinding
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
            delay(1400L)
            dashboardViewModel.update()
        }
    }
}