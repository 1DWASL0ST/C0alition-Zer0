package com.example.backend.database


import com.example.backend.models.UserTable
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

object Postgres {
    fun init() {
        val url = System.getenv("DB_URL")
        val user = System.getenv("DB_USER")
        val password = System.getenv("DB_PASSWORD")

        Database.connect(url, user = user, password = password)

        transaction {
            SchemaUtils.create(UserTable)
        }
    }
}