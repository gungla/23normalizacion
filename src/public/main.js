

const socket = io.connect();

/*
socket.on('productos', function (productos) {
    console.log('productos socket client')
    document.getElementById('datos-tabla').innerHTML = data2TableHBS(productos)
    
    
});

*/
const schemaAuthor = new normalizr.schema.Entity('author',{},{idAttribute: 'email'});

const schemaMensaje = new normalizr.schema.Entity('mensaje', {
    author: schemaAuthor
},{idAttribute: '_id'})

const schemaMensajes = new normalizr.schema.Entity('mensaje', {
  mensajes: [schemaMensaje]
},{idAttribute: 'id'})

socket.on('mensajes',function (data) {
    console.log(data)
    const normali =normalizr.normalize(data, mensajes);
    const denormalizedData =normalizr.denormalize(data.result, schemaMensajes,data.entities );
    console.log( denormalizedData)

    console.log("------------Objetos original------------")
    console.log(JSON.stringify(data).length)

    console.log("------------Objetos Normalizado------------")
    console.log(JSON.stringify(data).normali)

    console.log("------------Objetos Desnormalizado------------")
    console.log(JSON.stringify(denormalizedData).length)
//    render(data)
})

/*
function render(data){
    let html = data.map(elem =>{
        return (` 
            <div class="allMensajes">
                <p class="email">${elem.email} </p>
                <span class="fecha">[${elem.fecha}] :</span>
                 <em class="texto">${elem.texto}</em>
            </div>
        `)
    }).join(" ");
    document.getElementById("mensajes").innerHTML = html
}

*/

function addMessage(e){
    let mensajes = {
        author :{
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        } , 
        mensaje: document.getElementById('mensaje').value
    }
    console.log(mensajes)
    socket.emit('nuevo-mensaje',mensajes);
    return false
}




const form = document.getElementById('form-datos');
form.addEventListener('submit', event => {
    event.preventDefault();
    const data = { title: form[0].value, price: form[1].value, thumbnail: form[2].value };
   
    fetch('/api/productos/guardar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(respuesta => respuesta.json())
    .then(productos => {
        form.reset();
        socket.emit('update', 'ok');
    })
    .catch(error => {
        console.log('ERROR', error);
    });
});

function data2TableHBS(productos) {
    const plantilla = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>

        {{#if productos.length}}
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
                {{#each productos}}
                <tr>
                    <td>{{this.title}}</td>
                    <td>$ {{this.price}}</td>
                    <td><img width="50" src={{this.thumbnail}} alt="not found"></td>
                </tr>
                {{/each}}
            </table>
        </div>
        {{/if}}
    `

    console.log(productos);
    var template = Handlebars.compile(plantilla);
    let html = template({ productos: productos, hayProductos: productos.length });
    return html;
}
