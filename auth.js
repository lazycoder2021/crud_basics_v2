const auth = function(req, res, next) {
    console.log('middleware meddling...')
    console.log(req.session.userId)
    try {
        if (req.session.userId) {
            console.log(req.session.userId)
            next()
        } else {
            return res.status(404).json({ "msg": "access denied" })
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    auth
}
    
