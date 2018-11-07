'use strict';
//hjhjhjvhdhs
//mayangberubah
// test
const restify = require('restify');
const logger = require('./config/log');
const moment = require('moment');
const DB = require('./config/db');
global.config = require('./config/app');

DB.connect((err, db) => {
    if (err != null) 
    {
        logger.error(err);
        process.exit();
    }
    else
    {
        const server = restify.createServer(
            {
                name : "Marcomm API",
                version : "1.0.0",
                log: logger
            }
        );

        logger.info('[DATABASE]' + config.dbconn +  ' connected');

        global.dbo = DB.getconnection();

        server.use(restify.plugins.acceptParser(server.acceptable));
        server.use(restify.plugins.queryParser());
        server.use(restify.plugins.bodyParser());

        server.get('/', restify.plugins.serveStatic(
            {
                directory : __dirname,
                default : "/layout/index.html"
            }
        ));

        require('./routes/route')(server);

        server.listen(config.port, function(){
            logger.info(server.name + " call " +  server.url + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
        });
    }
});