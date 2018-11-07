'use strict';

const Response = require('../config/response');
const jwt = require('jsonwebtoken');
const secret = require('../config/token');
const moment = require('moment');
const logger = require('../config/log');

const AuthMiddleware = {
    checkToken : (req, res, next) => {
        logger.info("AuthMiddleware accessed" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
        logger.info("AuthMiddleware header content " + req.headers);

        var token = req.headers.authorization;
        if(token == null)
        {
            logger.info({data: token}, "AuthMiddleware failed verified at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info("Failed reason : You are not authorized.");
            Response.send(res, 403, 'You are not authorized');
        }
        else
        {
            jwt.verify(token, secret.secretkey, (err, decrypt) => {
                if(decrypt != undefined)
                {
                    req.userdata = decrypt;
                    global.user = decrypt;
                    logger.info({data: req.userdata}, "AuthMiddleware successfully verified at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                    next();
                }
                else
                {
                    logger.info({data: token}, "AuthMiddleware failed verified at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                    logger.info("Failed reason : You are not authorized.");
                    Response.send(res, 403, 'You are not authorized');
                }
            });
        }
    }
};

module.exports = AuthMiddleware;