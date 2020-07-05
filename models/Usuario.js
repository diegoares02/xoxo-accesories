module.exports = (sequelize, type) => {
    const Usuario = sequelize.define('usuario', {
        username: {
            type: type.STRING
        },
        password: {
            type: type.STRING            
        }
    }, {
        timestamps: true
    });
    return Usuario;
}