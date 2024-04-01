const jwt = require('jsonwebtoken');

// Secret key
const secretKey = 'your_secret_key';

// Generate token
function generateToken(user) {
    const payload = {
        id: user.iduser,
        name: user.name,
        email: user.email
    };
    const options = {
        expiresIn: '1h'
    };
    return jwt.sign(payload, secretKey, options);
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = {
    generateToken,
    verifyToken
};

