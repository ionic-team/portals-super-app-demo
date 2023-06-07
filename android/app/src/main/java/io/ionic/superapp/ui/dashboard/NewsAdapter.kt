package io.ionic.superapp.ui.dashboard

import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.fragment.app.FragmentManager
import androidx.recyclerview.widget.RecyclerView
import io.ionic.superapp.data.model.News
import io.ionic.superapp.databinding.NotificationRowItemBinding

class NewsAdapter(private val news: List<News>, private val fragmentManager: FragmentManager) :
    RecyclerView.Adapter<NewsAdapter.NewsViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NewsViewHolder {
        val binding =
            NotificationRowItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return NewsViewHolder(binding)
    }

    override fun getItemCount(): Int {
        return news.size
    }

    override fun onBindViewHolder(holder: NewsViewHolder, position: Int) {
        val newsItem = news[position]
        holder.binding.rowText.text = newsItem.headline

        holder.itemView.setOnClickListener {
            Log.d("Tap", "Tapped ${newsItem.headline}")
            NewsReaderDialog(newsItem).display(fragmentManager)
        }
    }

    class NewsViewHolder(val binding: NotificationRowItemBinding) :
        RecyclerView.ViewHolder(binding.root)
}