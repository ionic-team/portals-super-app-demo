package io.ionic.superapp.ui.dashboard

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import io.ionic.superapp.data.DataManager
import io.ionic.superapp.data.model.App
import io.ionic.superapp.data.model.Event
import io.ionic.superapp.data.model.News

class DashboardViewModel : ViewModel() {
    private val _appList = MutableLiveData<List<App>>()
    val appList: LiveData<List<App>> = _appList

    private val _eventList = MutableLiveData<List<Event>>()
    val eventList: LiveData<List<Event>> = _eventList

    private val _newsList = MutableLiveData<List<News>>()
    val newsList: LiveData<List<News>> = _newsList

    suspend fun update() {
        val apps = DataManager.instance.getApps()
        val events = DataManager.instance.getRecentActivity()
        val news = DataManager.instance.getNewsFeed()

        _appList.value = apps
        _eventList.value = events
        _newsList.value = news
    }

    suspend fun logout() {
        DataManager.instance.logout()
    }
}