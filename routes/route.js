'use strict';

const Middleware = require('../middleware/tokenauthorization');
const corsMiddleware = require('restify-cors-middleware');
const moment = require('moment');
const logger = require('../config/log');
const EmployeeController = require('../controllers/m_employee');

module.exports = exports = function(server){

    logger.info("Initializing Route Path" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

    var cors = corsMiddleware({
        origins : ['*'],
        allowHeaders : ['suproapptoken']
    });

    server.pre(cors.preflight);
    // server.use(cors.actual);

    logger.info("Restify Cors Middleware already set" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
    logger.info("Route already accessed" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

    // Set Route Path Here

    //EMPLOYEE
    server.get('/api/employee/', EmployeeController.GetAllHandler);
    server.get('/api/employee/:id', EmployeeController.GetDetailByEmployeeIDHandler);
    server.post('/api/employee/', EmployeeController.AddEmployeeHandler);
    server.put('/api/employee/:id', EmployeeController.UpdateEmployeeHandler);
    server.del('/api/employee/:id', EmployeeController.DeleteEmployeeHandler);
    // server.post('/api/employee/search', EmployeeController.SearchEmployeeHandler);
    
};