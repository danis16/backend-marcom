'use strict';

const Middleware = require('../middleware/tokenauthorization');
const corsMiddleware = require('restify-cors-middleware');
const moment = require('moment');
const logger = require('../config/log');

const EmployeeController = require('../controllers/employee');
const MsouvenirController = require('../controllers/m_souvenir');
const TSItemController = require('../controllers/t_souvenir');


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
   
     //m_souvenir
    server.get('/api/souvenir/', MsouvenirController.GetAll);
    server.get('/api/souvenir/:id', MsouvenirController.GetDetail);
    server.post('/api/souvenir/', MsouvenirController.Create);
    // server.put('/api/souvenir/:id', MsouvenirController.Update);
    // server.del('/api/souvenir/:id', MsouvenirController.Delete);
 
     //t_souvenir
    //  server.get('/api/tsouvenir/', TSItemController.GetAll);
    //  server.get('/api/tsouvenir/:id', TSItemController.GetDetail);
     // server.post('/api/souvenir/', msouvenir.Create);
     // server.put('/api/souvenir/:id', msouvenir.Update);
     // server.del('/api/souvenir/:id', msouvenir.Delete)
   
    
};