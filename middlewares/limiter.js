const rateLimiter = require("express-rate-limit");

// default http status 429 Too Many Requests
function createRateLimiter(maxRequests, windowMs) {
    return rateLimiter({
        max: maxRequests,
        windowMs: windowMs,
        message: `Rate limit exceeded. Please wait and try your request again later.`
    });
}



module.exports = createRateLimiter;