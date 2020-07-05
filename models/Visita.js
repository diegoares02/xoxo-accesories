module.exports = (sequelize, type) => {
    const Visita = sequelize.define('visita', {
        codigo: {
            type: type.STRING
        },
        dispositivo: {
            type: type.STRING
        },
        IP: {
            type: type.STRING
        },
        fecha: {
            type: type.DATE,
            defaultValue: type.NOW
        }
    }, {
        timestamps: true
    });
    return Visita;
}