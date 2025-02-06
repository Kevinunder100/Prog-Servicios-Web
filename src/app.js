// Importamos Express, un framework para crear servidores en Node.js  
const express = require('express');  

// Creamos una instancia de la aplicación Express  
const app = express();  

// Middleware para permitir el manejo de JSON en las solicitudes  
app.use(express.json());  

// Definimos una ruta GET en la raíz ('/') que responde con "Hello World"  
app.get('/', (req, res) => {  
    res.send('Hello World'); // Enviamos la respuesta al cliente  
});  

app.get('/sum', (req, res) => { 
   
    const { num1, num2 } = req.query; // Obtenemos los números de la consulta  
    const sum = Number(num1) + Number(num2); // Realizamos la suma  
    res.send({ sum }); // Enviamos la respuesta al cliente  

}); 

// Arreglo para almacenar usuarios 
const usuarios = [];

app.post('/register', (req, res) => {  
    // Extraemos username y password del cuerpo de la solicitud
    const { username, password } = req.body;  

    // Enviamos una respuesta en formato JSON con los datos recibidos
    res.json({ 
        message: "Registro exitoso",  // Mensaje de confirmación
        usuario: { username, password } // Retorna el usuario registrado
    });
});


// Ejemplo de solicitud GET:
http://localhost:8080/sum?num1=300&num2=45

// Exportamos la instancia de la aplicación para ser utilizada en otros archivos  
module.exports = app;  
