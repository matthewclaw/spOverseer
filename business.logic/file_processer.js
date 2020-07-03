const logger = require('./logger.js');

fs = require('fs');
logger = require('./logger.js');

getPlainValue = (line) => {
    let valsplit = lines.split(':');
    let rawVal = line;
    if (valsplit.length > 1) {
        rawVal = valsplit[1];
    }
    rawVal = rawVal.replace("'", "");
    return rawVal;
}
extractData = (fileContents) => {
    data = {}
    try {
        data = JSON.parse(fileContents);
    }
    catch (err) {
        lines = fileContents.split('\n');
        for (let i = 0; i < lines.length; i++) {
            line = lines[i].trim();
            if (line && line.length > 0) {
                if (!data.system_state && line.contains('system_state')) {
                    data.system_state = getPlainValue(line);
                    logger.info('Read in System State')
                }
                else if (!data.errors && line.contains('errors')) {
                    raw = getPlainValue(line);
                    data.errors = [];
                    if (raw !== 'none') {
                        spl = raw.split(',');
                        data.error.push(spl);
                        logger.info(`Read in ${data.errors.length} errors`);
                    }
                    else {
                        logger.info("Read in no errors");
                    }
                }
                else if (!data.Data_uplaoded && line.contains('Data_uplaoded')) {

                }
                else if (!data.Serial_number_of_device && line.contains('Serial_number_of_device')) {

                }

            }
        }
    }
}
writeTmp = (data) => {
    uniqid = require('uniqid')('', '.tmp');
    path = '../processing/' + uniqid;
    fs.writeFile(path, data, 'utf8', (err) => {
        if (err) {
            logger.error('Could not write tmp file...', err)
        }
        logger.info('sending...')
        sendData(data, path)
    });
}
removeTmp = (name) => {

}
sendData = (data, tmpName) => {

}
module.exports = {
    process: function (file) {
        logger.info('File is being read...');
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                return logger.log(err);
            }
            logger.info('File is being proccessed...');
        });
    }
}