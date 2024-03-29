const jwt = require('jsonwebtoken');
function authenticateToken (req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);
    console.log("Token:", token);
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Token is invalid or expired');
        console.log("Token verified, user:", user);
        req.user = user;
        next();
    });
};
module.exports = {authenticateToken};