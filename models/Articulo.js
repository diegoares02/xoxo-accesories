module.exports = (sequelize, type) => {
    const Articulo = sequelize.define('articulo', {
        nombre: {
            type: type.STRING
        },
        codigo: {
            type: type.STRING
        },
        descripcion: {
            type: type.STRING
        },
        precio: {
            type: type.INTEGER
        },
        cantidad: {
            type: type.INTEGER
        },
        imagen: {
            type: type.STRING
        }
    }, {
        timestamps: true
    });
    return Articulo;
}