package io.ionic.superapp.ui.dashboard

import android.graphics.Color
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import io.ionic.superapp.R
import io.ionic.superapp.data.model.Event

class EventAdapter(private val events: List<Event>) :
    RecyclerView.Adapter<EventAdapter.EventViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EventViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.notification_row_item, parent, false)
        return EventViewHolder(view)
    }

    override fun getItemCount(): Int {
        return events.size
    }

    override fun onBindViewHolder(holder: EventViewHolder, position: Int) {
        val eventItem = events[position]
        holder.eventText.text = eventItem.description

        holder.eventIcon.setColorFilter(Color.BLACK)
        if (eventItem.description.contains("PTO")) {
            holder.eventIcon.setImageResource(R.drawable.time)
        } else if (eventItem.description.contains("perks")) {
            holder.eventIcon.setImageResource(R.drawable.sparkles)
        } else {
            holder.eventIcon.setImageResource(R.drawable.people)
        }

        holder.itemView.setOnClickListener {
            Log.d("Tap", "Tapped ${eventItem.description}")
        }
    }

    class EventViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val eventText: TextView = itemView.findViewById(R.id.row_text)
        val eventIcon: ImageView = itemView.findViewById(R.id.notification_icon)
    }
}