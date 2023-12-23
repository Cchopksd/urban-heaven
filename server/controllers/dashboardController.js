exports.showData = (req, res) => {
    const { username } = req.session.user;
    try {
        res.status(200).json({ user: username });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
