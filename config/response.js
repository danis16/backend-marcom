'use strict';

const moment = require('moment');
const logger = require('../config/log');

module.exports = {
    send : (res, statuscode, message) => {
        let resp = {};
        resp.status = statuscode;
        resp.message = message;
        res.setHeader('Access-Control-Allow-Origin', '*');

        logger.info("Send response accessed at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
        logger.info({data : resp}, "Send response content");

        res.send(statuscode, resp);
    }
};