package io.ionic.superapp.data.model

import kotlinx.serialization.Serializable

@Serializable
data class App(
    val id: String,
    val created_at: String,
    val name: String,
    val appflow_id: String,
    val role_access: List<String>
)
