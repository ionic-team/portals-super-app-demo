package io.ionic.superapp.ui.dashboard

import android.graphics.Color
import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import io.ionic.superapp.R
import io.ionic.superapp.data.model.Event
import io.ionic.superapp.databinding.NotificationRowItemBinding

class EventAdapter(private val events: List<Event>) :
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
        holder.binding.eventIcon.setColorFilter(Color.BLACK)

        if (eventItem.description.contains("PTO")) {
            holder.binding.eventIcon.setImageResource(R.drawable.time)
        } else if (eventItem.description.contains("perks")) {
            holder.binding.eventIcon.setImageResource(R.drawable.sparkles)
        } else {
            holder.binding.eventIcon.setImageResource(R.drawable.people)
        }

        holder.itemView.setOnClickListener {
            Log.d("Tap", "Tapped ${eventItem.description}")
        }
    }

    class EventViewHolder(val binding: NotificationRowItemBinding) :
        RecyclerView.ViewHolder(binding.root)
}