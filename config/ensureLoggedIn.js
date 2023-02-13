function ensureLoggedIn(req, res, next) {
    if(!req.user) {
        return res.status(401).json('Unauthorized')
    }
    else {
        next()
    }
}

module.exports = ensureLoggedIn