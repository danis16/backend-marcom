'use strict';

const Response = require('../config/response');
const jwt = require('jsonwebtoken');
const secret = require('../config/token');
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcryptjs');
const moment = require('moment');
const logger = require('../config/log');

const UserController = {
    LoginHandler : (req, res, next) => {
        logger.info("LoginHandler accessed" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
        logger.info({data : req.body}, "LoginHandler body content");

        var usernm = req.body.username;
        var password = req.body.password;

        if(usernm == null || password == null)
        {
            logger.info("LoginHandler failed" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info("LoginHandler failed reason : User tidak ditemukan");
            Response.send(res, 404, 'User tidak ditemukan');
        }
        else
        {
            global.dbo.collection('User').findOne({UserName : usernm}, (err, data) => {
                if(data)
                {
                    if(bcrypt.compareSync(password, data.Password))
                    {
                        // Generate JWT Token
                        let token = jwt.sign(data, secret.secretkey,{
                            expiresIn: 7200
                        });

                        delete data.Password;

                        let doc = {
                            userdata : data,
                            token : token
                        };

                        logger.info("LoginHandler successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                        logger.info({data : doc}, "LoginHandler user content");
                        Response.send(res, 200, doc);
                    }
                    else
                    {
                        logger.info("LoginHandler failed" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                        logger.info("LoginHandler failed reason : Password yang Anda masukkan salah");
                        Response.send(res, 404, 'Password yang Anda masukkan salah');
                    }
                }
                else
                {
                    logger.info("LoginHandler failed" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                    logger.info("LoginHandler failed reason : User tidak ditemukan");
                    Response.send(res, 404, 'User tidak ditemukan');
                }
            });
        }
    },
    LogoutHandler : (req, res, next) => {
        let data = {
            status :"Logout berhasil",
            userdata : null,
            token : null
        };

        logger.info("LogoutHandler successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
        Response.send(res, 200, data);
    }
};

module.exports = UserController;