module.exports = (sequelize, type) => {
    const Venta = sequelize.define('venta', {
        cantidad: {
            type: type.INTEGER
        },
    }, {
        timestamps: true
    });
    return Venta;
}