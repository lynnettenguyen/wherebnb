// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// validateSignup will check the keys of username, email, and password
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    // check('username')
    //     .exists({ checkFalsy: true })
    //     .isLength({ min: 4 })
    //     .withMessage('Please provide a username with at least 4 characters.'),
    // check('username')
    //     .not()
    //     .isEmail()
    //     .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post( '/', validateSignup, async (req, res, next) => {
        // const { email, password, username, firstName, lastName } = req.body;
        const { firstName, lastName, email, password } = req.body;

        const errorResult = { errors: {} }
        if (!firstName) errorResult.errors.firstName = 'First Name is required';
        if (!lastName) errorResult.errors.lastName = 'Last Name is required';

        const findEmail = await User.findOne({
            where: { email }
        })

        if (findEmail) {
            const err = new Error('User already exists');
            err.status = 403;
            err.errors = { email: 'User with that email already exists' };
            return next(err);
        } else if (Object.keys(errorResult.errors).length) {
            const err = new Error('Validation Error');
            err.status = 400;
            err.errors = errorResult.errors
            next(err)
        } else {
            // let user = await User.signup({ email, username, password, firstName, lastName });
            let user = await User.signup({ email, password, firstName, lastName });
            // call the signup static method on the User model
            // if the user is successfully created, then call setTokenCookie and return a JSON response with the user information
            // if unsuccessful, then sequelize validation error will be passed onto error-handling middleware
            const token = await setTokenCookie(res, user);
            // const result = {}
            // result.token = req.headers['xsrf-token']
            // user = user.toJSON()
            // res.json(Object.assign(user, result))
            res.json({user, token})
        }
    }
);

module.exports = router;
