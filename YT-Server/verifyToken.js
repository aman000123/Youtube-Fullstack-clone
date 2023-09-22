const jwt = require('jsonwebtoken')

const { createError } = require('./error')

const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "You are not authenticated"))

    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
        if (err) {
            console.error("error in authenticated", err);
            return next(createError(403, "Your token is not valid"));
        }
        req.user = user;
        next();
    })
}

module.exports = { verifyToken }