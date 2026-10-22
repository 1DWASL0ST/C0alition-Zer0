package com.example.backend.routes

import com.example.backend.database.MongoDb
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.flow.toList
import kotlinx.serialization.json.Json

fun Route.cardRoutes() {
    get("/api/cards") {
        try {
            val cards = MongoDb.cardCollection.find().toList()
            val jsonString = Json { ignoreUnknownKeys = true }.encodeToString(cards)
            call.respondText(jsonString, ContentType.Application.Json)
        } catch (e: Exception) {
            call.respondText(
                "Ошибка БД: ${e.message}",
                status = HttpStatusCode.InternalServerError
            )
        }
    }
}