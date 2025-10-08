// Simple in-memory blacklist for demonstration (use Redis or DB for production)
import redisClient from "../config/redisConfig.js";

export async function blacklistRefreshToken(token) {
    await redisClient.set(token, token, { EX: 7 * 24 * 60 * 60 }); // Set with 7 days expiry
}

export async function isRefreshTokenBlacklisted(token) {
    const blackListed = await redisClient.get(token)
    if (!blackListed) return false
    return true
}