const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../constants");

const createAccessToken = (user) => {
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 1);
    const payload = {
        token_type: "access",
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),
    };
    return jwt.sign(payload, JWT_SECRET_KEY);
};

module.exports = {
    createAccessToken,
};
