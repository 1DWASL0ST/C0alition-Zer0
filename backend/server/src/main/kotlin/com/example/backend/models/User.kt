package com.example.backend.models

import org.jetbrains.exposed.sql.Table

data class User(
    val id: Int? = null,
    val email: String? = null,
    val username: String? = null,
    val passwordHash: String? = null,
    val role: String? = null,
)

object UserTable : Table("users") {
    val id = integer("id").autoIncrement() // В Postgres это SERIAL
    val email = varchar("email", 255).uniqueIndex()
    val username = varchar("username", 50).uniqueIndex()
    val passwordHash = varchar("password_hash", 255)
    val role = varchar("role", 20).default("USER")

    override val primaryKey = PrimaryKey(id)
}