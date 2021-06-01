const express = require( 'express' );
const cors = require( 'cors' );
const userRouter = require('../routes/user');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // DB
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }
    
    middlewares() {

        this.app.use( express.static( 'public' ) );
        this.app.use( cors() );
        this.app.use( express.json() );
    }

    routes() {

        this.app.use( '/api/usuarios', userRouter );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( `App listening on port ${ this.port }!` );
        });
    }

    async conectarDB() {
        await dbConnection();
    }

}

module.exports = Server;