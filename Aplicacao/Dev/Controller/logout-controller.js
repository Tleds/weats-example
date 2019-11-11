'use-strict'

exports.get = (req, res, next) => {
    res.status(200).json({ auth: false, "token": null })
}