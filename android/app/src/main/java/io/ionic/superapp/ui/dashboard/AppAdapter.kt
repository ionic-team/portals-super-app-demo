package io.ionic.superapp.ui.dashboard

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import io.ionic.superapp.R
import io.ionic.superapp.data.model.App

class AppAdapter(private val apps: List<App>) : RecyclerView.Adapter<AppAdapter.AppViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AppViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.app_row_item, parent, false)
        return AppViewHolder(view)
    }

    override fun getItemCount(): Int {
        return apps.size
    }

    override fun onBindViewHolder(holder: AppViewHolder, position: Int) {
        val appItem = apps[position]
        holder.appLabel.text = appItem.name
        holder.appIcon.setImageResource(appItem.drawableId)
    }

    class AppViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val appLabel: TextView = itemView.findViewById(R.id.app_label)
        val appIcon: ImageView = itemView.findViewById(R.id.app_icon)
    }
}