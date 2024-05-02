// rateLimitConfig.js

import  rateLimit from 'express-rate-limit'

// Define rate limiting options
const rateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
}

// Create a rate limiter middleware with the defined options
const rateLimiter = rateLimit(rateLimitOptions)

export default rateLimiter
