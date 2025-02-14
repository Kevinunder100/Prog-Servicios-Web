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

// Ruta para sumar dos números desde la consulta (query params)
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

// =========================
// Ejemplo con Awilix
// =========================
const { createContainer, asValue } = require('awilix'); // Importamos Awilix

// Creamos un contenedor de dependencias
const container = createContainer();

// Registramos un valor en el contenedor (un usuario con ID y nombre)
container.register('user', asValue({ id: 1, name: 'Kevin' }));

// Ruta para obtener el usuario almacenado en el contenedor
app.get('/user', (req, res) => res.json(container.resolve('user')));

// Iniciamos el servidor en el puerto 3030
app.listen(3030, () => console.log('Servidor en http://localhost:3030'));

// =========================
// Ejemplo con Sequelize
// =========================
const { Sequelize, DataTypes } = require('sequelize'); // Importamos Sequelize y DataTypes

// Configuramos la base de datos SQLite en memoria (no se guarda en archivo)
const sequelize = new Sequelize('sqlite::memory:');

// Definimos el modelo 'User' con un campo 'name' tipo STRING
const User = sequelize.define('User', { name: DataTypes.STRING });

(async () => {
  await sequelize.sync(); // Crea la tabla 'Users' si no existe

  // Ruta para crear un usuario en la base de datos
  app.post('/users', async (req, res) => res.json(await User.create(req.body)));

  // Ruta para obtener todos los usuarios registrados
  app.get('/users', async (req, res) => res.json(await User.findAll()));

  // Iniciamos el servidor en el puerto 3000
  app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
})();

// Exportamos la instancia de la aplicación para ser utilizada en otros archivos  
module.exports = app;  
