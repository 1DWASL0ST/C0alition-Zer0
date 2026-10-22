package com.example.backend.database

import com.example.backend.models.Card
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv

object MongoDb {
    private val dotenv = dotenv{ignoreIfMissing = true}

    private val connectionString = dotenv["MONGO_CONNETCION_STRING"]
        ?: System.getenv("MONGO_CONNECTION_STRING")
    private val databaseName = dotenv["MONGO_DATABASE_NAME"]
        ?: System.getenv("MONGO_DATABASE_NAME")

    private val client = MongoClient.create(connectionString)
    private val database = client.getDatabase(databaseName)

    val cardCollection = database.getCollection<Card>("Cards")
}