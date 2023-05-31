package io.ionic.superapp.ui.dashboard

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import io.ionic.superapp.data.model.App

class DashboardViewModel() : ViewModel() {

    private val _appList = MutableLiveData<ArrayList<App>>()
    val appList : LiveData<ArrayList<App>> = _appList

    private val _notificationList = MutableLiveData<ArrayList<App>>()
    val notificationList : LiveData<ArrayList<App>> = _notificationList

    private val _newsList = MutableLiveData<ArrayList<App>>()
    val newsList : LiveData<ArrayList<App>> = _newsList
}