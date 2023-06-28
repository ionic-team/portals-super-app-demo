package io.ionic.superapp.ui.plugins

import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "Dismiss")
class DismissPlugin(val callback: () -> Unit) : Plugin() {

    @PluginMethod
    fun dismiss(call: PluginCall) {
        callback()
        call.resolve()
    }
}