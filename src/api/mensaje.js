
const Mensaje = require('../models/mensaje');
const MongoCRUD = require('../repository/crud');
const { normalize, schema } = require('normalizr');




const schemaAuthor = new schema.Entity('author',{},{idAttribute: 'email'});

const schemaMensaje = new schema.Entity('mensaje', {
    author: schemaAuthor
},{idAttribute: '_id'})

const schemaMensajes = new schema.Entity('mensaje', {
  mensajes: [schemaMensaje]
},{idAttribute: 'id'})



class MensajeController extends MongoCRUD {

    constructor() {
        super(Mensaje);
    }

    async getAll() {
        try {
            let mensajes = await this.findAll()
            console.log(mensajes)
            let mensajesConId = { 
                id: 'mensajes', 
                mensajes : mensajes.map( mensaje => ({...mensaje._doc}))
            }
            //print(mensajesConId)
            let mensajesConIdN = normalize(mensajesConId, schemaMensajes)
            //print(mensajesConIdN)
            return mensajesConIdN;
        }
        catch {
            return []
        }
    }

}

module.exports = new  MensajeController();