const express = require('express')
const { showData } = require('../controllers/dashboardController')
const { isAuthenticated } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/dashboard', isAuthenticated, showData)

module.exports = router