const jwt = require('jsonwebtoken');

exports.showData = async (req, res) => {
    const token = req.session.user;
    try {
        const jwtPayload = jwt.verify(token, 'your_jwt_secret');
        if (jwtPayload) {
            console.log(jwtPayload);
            const { user_id, username, user_email } = jwtPayload
            res.status(200).json({ user_id, username, user_email })
        } else if (err) {
            console.error('Invalid JWT payload');
            res.status(500).json({ message: `Invalid JWT payload` })
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
    }
};
