const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Máximo de 100 peticiones por IP
  message: "Demasiadas solicitudes. Intenta más tarde.",
});

module.exports = limiter;
