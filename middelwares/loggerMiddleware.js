const winston = require("winston");
const path = require("path");

// Configuración de winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, "../logs/error.log"), level: "error" }),
    new winston.transports.File({ filename: path.join(__dirname, "../logs/combined.log") }),
    new winston.transports.Console({ format: winston.format.simple() }) // Muestra logs en consola también
  ],
});

// Middleware para registrar cada petición
const loggerMiddleware = (req, res, next) => {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

module.exports = { logger, loggerMiddleware };
