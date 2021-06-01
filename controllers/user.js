const { response } = require( 'express' );
const bcrypt = require( 'bcrypt' );

const Usuario = require( '../models/usuario' );


const getUsuarios = async( req, res = response ) => {

    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number( desde ) )
            .limit( Number( limit ) )
    ])

    res.json({
        ok: true,
        total,
        usuarios
    });
}

const postUsuarios = async( req, res = response ) => {

    try {
        const { nombre, correo, password, rol } = req.body;
        const usuario = new Usuario( { nombre, correo, password, rol } );
    
        usuario.password = bcrypt.hashSync( password, 10 );

        await usuario.save();

        res.json( {
            ok: true,
            usuario
        } );
        
    } catch (error) {
        console.log(error)
        return res.json( { error } );
    }
}

const updateUsuarios = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...rest } = req.body;

    if ( password ) {
        rest.password = bcrypt.hashSync( password, 10 );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, rest );

    res.status( 200 ).json( usuario );
}

const deleteUsuarios = async( req, res = response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.status( 200 ).json( usuario );
}


module.exports = {
    getUsuarios,
    postUsuarios,
    updateUsuarios,
    deleteUsuarios
}