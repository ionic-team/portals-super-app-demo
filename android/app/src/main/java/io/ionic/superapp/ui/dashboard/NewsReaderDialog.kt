package io.ionic.superapp.ui.dashboard

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.appcompat.widget.Toolbar
import androidx.fragment.app.DialogFragment
import androidx.fragment.app.FragmentManager
import io.ionic.superapp.R
import io.ionic.superapp.data.model.News

class NewsReaderDialog(val newsItem: News): DialogFragment() {
    private val TAG = "news_dialog"
    private var toolbar: Toolbar? = null

    @SuppressLint("UseRequireInsteadOfGet")
    fun display(fragmentManager: FragmentManager?) {
        show(fragmentManager!!, TAG)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setStyle(STYLE_NORMAL, R.style.Theme_SuperApp_Dialog)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        super.onCreateView(inflater, container, savedInstanceState)
        val view: View = inflater.inflate(R.layout.dialog_news_reader, container, false)
        toolbar = view.findViewById(R.id.toolbar)
        val newsText: TextView = view.findViewById(R.id.newsText)
        newsText.text = newsItem.body
        return view
    }

    override fun onStart() {
        super.onStart()
        val dialog = dialog
        if (dialog != null) {
            val width = ViewGroup.LayoutParams.MATCH_PARENT
            val height = ViewGroup.LayoutParams.MATCH_PARENT
            dialog.window!!.setLayout(width, height)
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        toolbar?.setNavigationOnClickListener { dismiss() }
        toolbar?.title = newsItem.headline
    }
}