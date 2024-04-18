
const jwtHelper = require("../helpers/jwt.helper");
require('dotenv').config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const isAuth = async (req, res, next) => {

    const tokenFromClient = req.headers["x-access-token"];

    if (tokenFromClient) {

        try {

            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
            req.jwtDecoded = decoded;

            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {

        return res.status(403).send({
            message: 'No token provided.',
        });
    }
}

module.exports = {
    isAuth
};