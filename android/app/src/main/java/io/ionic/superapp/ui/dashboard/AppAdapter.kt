package io.ionic.superapp.ui.dashboard

import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import io.ionic.superapp.data.model.App
import io.ionic.superapp.databinding.AppRowItemBinding

class AppAdapter(private val apps: List<App>) : RecyclerView.Adapter<AppAdapter.AppViewHolder>() {

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
        holder.binding.appIcon.setImageResource(appItem.drawableId)

        holder.itemView.setOnClickListener {
            Log.d("Tap", "Tapped ${appItem.name}")
        }
    }

    class AppViewHolder(val binding: AppRowItemBinding) : RecyclerView.ViewHolder(binding.root)
}