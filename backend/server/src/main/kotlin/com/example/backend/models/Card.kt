package com.example.backend.models

import kotlinx.serialization.Serializable
import org.bson.codecs.pojo.annotations.BsonId

@Serializable
data class Card (
    @BsonId val id: String? = null,
    val name: String,
    val dogtag: String,
    val dogtagRu: String,
    val `class`: String,
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
