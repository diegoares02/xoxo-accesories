module.exports = (sequelize, type) => {
    const Log = sequelize.define('log', {
        codigo: {
            type: type.UUID,
            defaultValue: type.UUIDV4
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
    return Log;
}