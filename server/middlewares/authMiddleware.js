exports.isAuthenticated = (req, res, next) => {
    // console.log('Session in isAuthenticated middleware:', req.session);
    // console.log(req.session.userInfo)
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}