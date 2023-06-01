package io.ionic.superapp.data.model

import kotlinx.serialization.Serializable

@Serializable
data class Event(
    val id: Int,
    val created_at: String,
    val fk: Int,
    val type: String,
    val read: Boolean,
    val description: String,
    val user_id: String
)
