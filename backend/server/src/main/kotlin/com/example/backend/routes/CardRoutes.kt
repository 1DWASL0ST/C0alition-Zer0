package com.example.backend.routes

import com.example.backend.database.MongoDb
import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.flow.toList

fun Route.cardRoutes() {
    get("/api/cards") {
        try {
            val cards = MongoDb.cardCollection.find().toList()
            call.respond(cards)
        } catch (e: Exception) {
            call.respondText(
                "Ошибка БД: ${e.message}",
                status = HttpStatusCode.InternalServerError
            )
        }
    }
}