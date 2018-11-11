'use strict';

const Middleware = require('../middleware/tokenauthorization');
const corsMiddleware = require('restify-cors-middleware');
const moment = require('moment');
const logger = require('../config/log');


const UserController = require('../controllers/m_user');
const EmployeeController = require('../controllers/m_employee');


module.exports = exports = function(server){

    logger.info("Initializing Route Path" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

    var cors = corsMiddleware({
        origins : ['*'],
        allowHeaders : ['authorization']
    });

    server.pre(cors.preflight);
    server.use(cors.actual);

    logger.info("Restify Cors Middleware already set" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
    logger.info("Route already accessed" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

    // Set Route Path Here

    //employee
    server.get('/api/employee/', EmployeeController.GetAllHandler);

    //user
    server.post('/api/user/login', UserController.LoginHandler);
    server.get('/api/user/logout', Middleware.checkToken, UserController.LogoutHandler);
};