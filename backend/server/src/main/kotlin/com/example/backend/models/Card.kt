package com.example.backend.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.codecs.pojo.annotations.BsonRepresentation
import org.bson.BsonType

@Serializable
data class Card(
    @BsonId
    @BsonRepresentation(BsonType.OBJECT_ID)
    @SerialName("_id")
    val id: String? = null,
    val name: String? = null,
    val dogtag: String? = null,
    val dogtagRu: String? = null,
    @SerialName("class") val `class`: String? = null,
    val faction: String? = null,
    val era: String? = null,
    val stats: CardStats? = null,
    val tags: List<String> = emptyList(),
    val art: CardArt? = null,
    val isActive: Boolean? = null
)

@Serializable
data class CardStats(
    val offence: Int? = null,
    val defence: Int? = null,
    val mobility: Int? = null,
    val startCompanySize: Int? = null,
    val resistancePerUnit: Int? = null
)

@Serializable
data class CardArt(
    val url: String? = null,
    val description: String? = null
)