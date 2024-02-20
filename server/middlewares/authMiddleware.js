exports.isAuthenticated = async (req, res, next) => {
    console.log(req.session.user);
    if (req.session.user) {
		return next();
	} else {
		res.status(401).json({ message: 'Unauthorized' });
	}
}

exports.isAdminAuthenticated = async (req, res, next) => {
    console.log(req.session.user.role);
	if (req.session.user.role === 'admin') {
		return next();
	} else {
		res.status(401).json({ message: 'มึงไม่ใช่แอดมิน' });
	}
};