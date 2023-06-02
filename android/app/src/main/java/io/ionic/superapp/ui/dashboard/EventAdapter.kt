package io.ionic.superapp.ui.dashboard

import android.app.Activity
import android.content.Intent
import android.graphics.Color
import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import io.ionic.superapp.R
import io.ionic.superapp.data.model.Event
import io.ionic.superapp.databinding.NotificationRowItemBinding
import io.ionic.superapp.ui.app.AppActivity

class EventAdapter(private val events: List<Event>, private val activity: Activity) :
    RecyclerView.Adapter<EventAdapter.EventViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EventViewHolder {
        val binding =
            NotificationRowItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return EventViewHolder(binding)
    }

    override fun getItemCount(): Int {
        return events.size
    }

    override fun onBindViewHolder(holder: EventViewHolder, position: Int) {
        val eventItem = events[position]
        holder.binding.rowText.text = eventItem.description

        if (eventItem.description.contains("PTO")) {
            holder.binding.eventIcon.setImageResource(R.drawable.time)
        } else if (eventItem.description.contains("perks")) {
            holder.binding.eventIcon.setImageResource(R.drawable.sparkles)
        } else {
            holder.binding.eventIcon.setImageResource(R.drawable.people)
        }

        holder.itemView.setOnClickListener {
            activity.startActivity(Intent(activity, AppActivity::class.java).apply {
                putExtra("portalName", eventItem.type)
                putExtra("eventId", eventItem.id.toString())
            })
        }
    }

    class EventViewHolder(val binding: NotificationRowItemBinding) :
        RecyclerView.ViewHolder(binding.root)
}