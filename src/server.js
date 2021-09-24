const express = require ('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const controller = require('./api/mensaje')


const config = require('./config/config.json');
const dotenv = require('dotenv');


require('./database/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))





io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');
    socket.emit('mensajes', await controller.getAll());
    
    socket.on('nuevo-mensaje',async mensaje =>{
        // guardando datos en la bd
       controller.create(mensaje).then( async contenido => {
        }).catch(error => {console.log(error)})
        
    });

});


//const route_productos = require('./routers/producto');


server.listen(8080,  () => {
    console.log("escuchando puerto 8080")
})

