const opts = {
    logDirectory: './logs',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};
const log = require('simple-node-logger').createRollingFileLogger(opts);

module.exports = {
    info: function (data) {
        log.info(data)
        console.info(data)
    },
    warn: function (data) {
        log.warn(data)
        console.warn(data);

    },
    error: function (data) {
        log.error(data)
        console.error(data)
    }

}