package com.example.backend.models

import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName

@Serializable
data class Card (
    @SerialName("_id")
    val id: String? = null,
    val name: String,
    val dogtag: String,
    val dogtagRu: String,
    @SerialName("class") val `class`: String,
    val faction: String,
    val era: String,
    val stats: CardStats,
    val tags: List<String>,
    val art: CardArt,
    val isActive: Boolean
)

@Serializable
data class CardStats(
    val offence: Int,
    val defence: Int,
    val mobility: Int,
    val startCompanySize: Int,
    val resistancePerUnit: Int
)

@Serializable
data class CardArt(
    val url: String,
    val description: String
)
