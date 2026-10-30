package com.example.backend.DTO

import kotlinx.serialization.Serializable

@Serializable
data class RegisterRequest(
    val email: String,
    val username: String,
    val password: String
)

@Serializable
data class LoginRequest(
    val username: String,
    val password: String
)
@Serializable
data class UserResponse(
    val id: Int,
    val email: String,
    val username: String,
    val role: String
)