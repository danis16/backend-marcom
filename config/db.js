'use strict';

const logger = require('./log');
const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
var dbo = null;

const DBConnection = {
    connect : (conn) => {
        logger.info("Initializing Connect to MongoDB" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
        MongoClient.connect(global.config.dbconn, {useNewUrlParser : true}, (err, db) => {
            if(!err)
            {
                dbo = db.db(global.config.dbname);
            }
            conn(err, db);
        });
    },
    getconnection : () => {
        logger.info("Get Connection to Database" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
        return dbo;
    }
};

module.exports = DBConnection;