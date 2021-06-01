const Role = require( '../models/role' );
const Usuario = require( '../models/usuario' );


const isRoleValid = async ( rol = '' ) => {

    const existeRol = await Role.findOne( { rol } );

    if ( !existeRol ) {
        throw new Error( `El rol ${ rol } no existe en la Base de Datos.` );
    }
}

const emailExists = async ( correo = '' ) => {
    
    const existeEmail = await Usuario.findOne( { correo } );

    if ( existeEmail ) {
        throw new Error( 'Ese correo ya está registrado' );
    }
}

const idExists = async ( id = '' ) => {
    
    const existeId = await Usuario.findById( id );

    if ( !existeId ) {
        throw new Error( `El id ${ id } no existe.` );
    }
}

module.exports = {
    isRoleValid,
    emailExists,
    idExists
}