// Importamos la aplicación desde el archivo 'app.js'  
const app = require('./app');  

// Definimos el puerto en el que el servidor escuchará las solicitudes  
const port = 8080;  

// Función autoejecutable asíncrona para iniciar el servidor  
(async () => {  
    console.log('Starting server ...'); // Mensaje indicando que el servidor está iniciando  

    // Iniciamos el servidor en el puerto especificado  
    app.listen(port, () => {  
        console.log(`Server is running on port ${port}`); // Mensaje confirmando que el servidor está en ejecución  
    });  
})();  