const express = require('express');
const sequelize = require('./config/databases');
const routes = require('./routes/index');
require('dotenv').config();
const {loggerMiddleware} = require('./middelwares/loggerMiddleware');
const limiter = require('./middelwares/rateLimitMiddleware');
const verifyToken = require('./middelwares/verifyToken');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swaggerJSDoc.json');

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(loggerMiddleware);
app.use(limiter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

sequelize.sync()
    .then( () => console.log("DB is ready"))
    .catch( err => console.error(err));

app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
});

app.use(routes.unprotectedRoutes);
app.use(verifyToken);
app.use(routes.protectedRoutes);






