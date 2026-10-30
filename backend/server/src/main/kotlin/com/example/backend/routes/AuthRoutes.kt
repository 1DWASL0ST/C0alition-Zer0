package com.example.backend.routes

import com.example.backend.DTO.*
import com.example.backend.models.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.or
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.mindrot.jbcrypt.BCrypt

fun Route.authRoutes() {

    // 1. РЕГИСТРАЦИЯ
    post("/api/register") {
        val request = call.receive<RegisterRequest>()

        // Простая валидация
        if (request.password.length < 6) {
            return@post call.respondText("Пароль должен быть не менее 6 символов", status = HttpStatusCode.BadRequest)
        }

        try {
            val response = transaction {
                // Проверяем, занят ли логин или email
                val exists = !UserTable.selectAll()
                    .where { (UserTable.username eq request.username) or (UserTable.email eq request.email) }
                    .empty()

                if (exists) {
                    throw Exception("Пользователь с таким username или email уже существует")
                }

                // Хешируем пароль
                val hash = BCrypt.hashpw(request.password, BCrypt.gensalt())

                // Вставляем в базу и получаем сгенерированный ID (начиная с 1000)
                val newId = UserTable.insert {
                    it[email] = request.email
                    it[username] = request.username
                    it[passwordHash] = hash
                    it[role] = "USER"
                } get UserTable.id

                // Возвращаем безопасный ответ
                UserResponse(newId, request.email, request.username, "USER")
            }

            call.respond(HttpStatusCode.Created, response)

        } catch (e: Exception) {
            call.respondText("Ошибка регистрации: ${e.message}", status = HttpStatusCode.Conflict)
        }
    }

    // 2. АВТОРИЗАЦИЯ (Логин)
    post("/api/login") {
        val request = call.receive<LoginRequest>()

        try {
            val response = transaction {
                // Ищем пользователя по логину
                val userRow = UserTable.selectAll()
                    .where { UserTable.username eq request.username }
                    .singleOrNull() ?: throw Exception("Неверный логин или пароль")

                // Проверяем пароль (сравниваем введенный с хешем из базы)
                if (!BCrypt.checkpw(request.password, userRow[UserTable.passwordHash])) {
                    throw Exception("Неверный логин или пароль")
                }

                // Возвращаем безопасный ответ
                UserResponse(
                    id = userRow[UserTable.id],
                    email = userRow[UserTable.email],
                    username = userRow[UserTable.username],
                    role = userRow[UserTable.role]
                )
            }

            // Пока просто отдаем данные. Позже сюда добавим генерацию JWT-токена.
            call.respond(HttpStatusCode.OK, response)

        } catch (e: Exception) {
            call.respondText("Ошибка входа: ${e.message}", status = HttpStatusCode.Unauthorized)
        }
    }
}