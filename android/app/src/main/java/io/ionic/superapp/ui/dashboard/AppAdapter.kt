package io.ionic.superapp.ui.dashboard

import android.app.Activity
import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import io.ionic.liveupdates.LiveUpdateManager
import io.ionic.superapp.R
import io.ionic.superapp.data.model.App
import io.ionic.superapp.databinding.AppRowItemBinding
import io.ionic.superapp.ui.app.AppActivity

class AppAdapter(private val apps: List<App>, private val activity: Activity) : RecyclerView.Adapter<AppAdapter.AppViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AppViewHolder {
        val binding = AppRowItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return AppViewHolder(binding)
    }

    override fun getItemCount(): Int {
        return apps.size
    }

    override fun onBindViewHolder(holder: AppViewHolder, position: Int) {
        val appItem = apps[position]
        holder.binding.appLabel.text = appItem.name

        when (appItem.id) {
            "hr" -> holder.binding.appIcon.setImageResource(R.drawable.people)
            "crm" -> holder.binding.appIcon.setImageResource(R.drawable.crm)
            "time" -> holder.binding.appIcon.setImageResource(R.drawable.time)
            "perks" -> holder.binding.appIcon.setImageResource(R.drawable.sparkles)
            else -> {
                holder.binding.appIcon.setImageResource(R.drawable.crm)
            }
        }

        holder.itemView.setOnClickListener {
            if(portalIsPresent(appItem.id, appItem.appflow_id)) {
                activity.startActivity(Intent(activity, AppActivity::class.java).apply {
                    putExtra("portalName", appItem.id)
                })
            } else {
                Toast.makeText(activity, "App is downloading, please wait...", Toast.LENGTH_LONG).show()
                LiveUpdateManager.sync(activity)
            }
        }
    }

    class AppViewHolder(val binding: AppRowItemBinding) : RecyclerView.ViewHolder(binding.root)

    private fun portalIsPresent(portalId: String, liveUpdateId: String): Boolean {
        val localCopyPresent = activity.getResources().getAssets().list("")?.contains(portalId)
        return if (localCopyPresent == true) {
            true
        } else {
            LiveUpdateManager.getLatestAppDirectory(activity, liveUpdateId) != null
        }
    }
}