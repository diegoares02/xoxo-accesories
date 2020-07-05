const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
module.exports = (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        let certificado = path.join(__dirname, 'certificado.pem');
        let privateKey = fs.readFileSync(certificado, 'utf8');
        jwt.verify(token, privateKey, { expiresIn: '1d', algorithm: "HS256" }, (err, user) => {
            if (err) {
                res.status(500).json({ error: err });
            }
            else {
                return next();
            }
        });
    }
    else {
        res.status(500).json({ error: "Not Authorized" });
    }
}