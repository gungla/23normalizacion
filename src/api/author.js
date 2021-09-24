
const Author = require('../models/author');
const MongoCRUD = require('../repository/crud');

class AuthorController extends MongoCRUD {

    constructor() {
        super(Author);
    }
}

module.exports =new  AuthorController ();