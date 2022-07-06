// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Room } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// sets the JWT Cookie after user is logged in or signed up
// generates JWT using imported secret
const setTokenCookie = (res, user) => {
    // create the token.
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";
    // set the token cookie (HTTP-only cookie)
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });
    return token;
};

// restoreUser will restore the session user based on the contents of the JWT cookie
const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
            // console.log(req.user)
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

// If there is no current user, return an error
// requires a session user to be authenticated before accessing a route
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
}

const checkIfOwner = async function (req, _res, next) {
    const room = await Room.findAll({
        where: {
            id: req.params.roomId,
            ownerId: req.user.id
        }
    })
    console.log(room)
    if (Object.keys(room).length) {
        const err = new Error('You are not permitted to book rooms you own');
        err.errors = ['Unauthorized'];
        err.status = 403;
        return next(err);
    } else {
        return next()
    }
}

module.exports = { setTokenCookie, restoreUser, requireAuth, checkIfOwner };
