'use strict';

var winston = require('winston');
var bunyan = require('bunyan');
var appRoot = require('app-root-path');

function Bunyan2Winston(wlog) {
    this.wlog = wlog
}

var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/log/app.log`,
        handleExceptions: true,
        json: true,
        colorize: false,
        timestamp: function () {
            return new Date();
        },
        humanReadableUnhandledException: true
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp: function () {
            return new Date();
        }
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
        ],
    exitOnError: false
});

Bunyan2Winston.prototype.write = function write(rec) {
    var wlevel;
    if (rec.level <= bunyan.INFO)
    {
        wlevel = 'info';
    }
    else if (rec.level <= bunyan.WARN)
    {
        wlevel = 'warn';
    }
    else
    {
        wlevel = 'error';
    }

    var msg = rec.msg;
    delete rec.msg;

    delete rec.v;
    delete rec.level;

    rec.time = String(rec.time);
    this.wlog.log(wlevel, msg, rec);
};

var shim = bunyan.createLogger({
    name: 'MarcommApp Logging System',
    streams: [{
        type: 'raw',
        level: 'debug',
        stream: new Bunyan2Winston(logger)
    }]
});

module.exports = shim;