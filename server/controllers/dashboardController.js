const jwt = require('jsonwebtoken');

exports.showData = async (req, res) => {
    const payload = req.session.user;
    console.log(payload)
    try {

        if (payload) {
            res.status(200).json( payload )
        } else if (err) {
            console.error('err');
            res.status(500).json({ message: err })
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
    }
};
