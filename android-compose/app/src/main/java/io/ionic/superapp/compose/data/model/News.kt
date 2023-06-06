package io.ionic.superapp.data.model

import kotlinx.serialization.Serializable

@Serializable
data class News(val id: Int, val created_at: String, val headline: String, val body: String)
