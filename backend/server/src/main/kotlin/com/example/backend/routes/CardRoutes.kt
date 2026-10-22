package com.example.backend.routes

import com.example.backend.database.MongoDb
import com.example.backend.models.Card
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.receive
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
    post("/api/cards"){
        try{
            val newCard = call.receive<Card>()

            val cardWithId = newCard.copy(id = org.bson.types.ObjectId().toHexString())

            MongoDb.cardCollection.insertOne(cardWithId)

            val jsonString = kotlinx.serialization.json.Json.encodeToString(cardWithId)

            call.respondText(jsonString, ContentType.Application.Json,HttpStatusCode.Created)
        } catch (e: Exception){
            call.respondText("Ошибка при создании карты: ${e.message}",
            status = HttpStatusCode.BadRequest)
        }
    }

    delete("/api/cards/{id}") {
        try {
            val idParam = call.parameters["id"]
                ?: return@delete call.respondText("ID не указан", status = HttpStatusCode.BadRequest)

            val objectId = try {
                org.bson.types.ObjectId(idParam)
            } catch (e: IllegalArgumentException) {
                return@delete call.respondText("Неверный формат ID", status = HttpStatusCode.BadRequest)
            }

            val result = MongoDb.cardCollection.deleteOne(
                org.bson.Document("_id", objectId)
            )
            
            if (result.deletedCount > 0) {
                call.respondText("Карта успешно удалена", status = HttpStatusCode.OK)
            } else {
                call.respondText("Карта с таким ID не найдена", status = HttpStatusCode.NotFound)
            }

        } catch (e: Exception) {
            e.printStackTrace()
            call.respondText(
                "Ошибка при удалении: ${e.message}",
                status = HttpStatusCode.InternalServerError
            )
        }
    }
}