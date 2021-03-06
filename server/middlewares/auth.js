const config = require('config')
const jsonwebtoken = require('jsonwebtoken')



module.exports.employeeAuth = function (req, res, next) {
    const req_jwt = req.header('x-auth-token')
    if (!req_jwt) {
        return res.status(401).json({
            error: 'NO_AUTH_TOKEN',
            payload: {
            }
        })
    }
    try {
        const parsed_token = jsonwebtoken.verify(req_jwt, config.get("token-secret"))
        if (parsed_token.type !== 'employee') {
            return res.status(401).json({
                error: 'INVALID_TOKEN',
                payload: {
                }
            })
        } else {
            req.user = parsed_token
            next()
        }
    } catch (error) {
        return res.status(401).json({
            error: 'INVALID_TOKEN',
            payload: {
            }
        })
    }
}

module.exports.adminAuth = function (req, res, next) {
    const req_jwt = req.header('x-auth-token')
    if (!req_jwt) {
        return res.status(401).json({
            error: 'NO_AUTH_TOKEN',
            payload: {
            }
        })
    }
    try {
        const parsed_token = jsonwebtoken.verify(req_jwt, config.get("token-secret"))
        if (parsed_token.type !== 'admin') {
            return res.status(401).json({
                error: 'INVALID_TOKEN',
                payload: {
                }
            })
        } else {
            req.user = parsed_token
            next()
        }
    } catch (error) {
        return res.status(401).json({
            error: 'INVALID_TOKEN',
            payload: {
            }
        })
    }
}


//Auth Token middleware
module.exports.auth = function (req, res, next) {
    const req_jwt = req.header('x-auth-token')
    if (!req_jwt) {
        return res.status(401).json({
            error: 'NO_AUTH_TOKEN',
            payload: {
            }
        })
    }
    try {
        const parsed_token = jsonwebtoken.verify(req_jwt, config.get("token-secret"))
        req.user = parsed_token
        next()
    } catch (error) {
        return res.status(401).json({
            error: 'INVALID_TOKEN',
            payload: {
            }
        })
    }
}