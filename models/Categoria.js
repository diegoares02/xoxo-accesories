module.exports = (sequelize, type) => {
    const Categoria = sequelize.define('categoria', {
        nombre: {
            type: type.STRING
        },
        estado: {
            type: type.BOOLEAN
        },
        descripcion: {
            type: type.STRING
        }
    }, {
        timestamps: true
    });
    return Categoria;
}