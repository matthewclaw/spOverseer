fs = require('fs');
logger = require('./logger.js');
axios = require('axios').default;
config = require('config');

getPlainValue = (line) => {
    let valsplit = line.split(':');
    let rawVal = line;
    if (valsplit.length > 1) {
        rawVal = valsplit[1];
    }
    rawVal = rawVal.replace("'", " ").trim();
    return rawVal;
}
extractData = (fileContents) => {
    data = {}
    try {
        data = JSON.parse(fileContents);
    }
    catch (err) {
        lines = fileContents.split('\n');
        inPhase = false;
        currentPhase = {}
        data.Phases = [];
        data.errors = [];
        for (let i = 0; i < lines.length; i++) {
            line = lines[i].trim();
            if (line && line.length > 0) {
                if (!data.system_state && line.includes('system_state')) {
                    data.system_state = getPlainValue(line);
                    logger.info('Read in System State')
                }
                else if (!data.errors && line.includes('errors')) {
                    raw = getPlainValue(line);
                    if (raw !== 'none') {
                        spl = raw.split(',');
                        for (j = 0; j < spl.length; j++)
                            data.errors.push(spl[j]);
                        logger.info(`Read in ${data.errors.length} errors`);
                    }
                    else {
                        logger.info("Read in no errors");
                    }
                }
                else if (!data.Data_uplaoded && line.includes('Data_uplaoded')) {
                    data.Data_uplaoded = getPlainValue(line).toUpperCase().startsWith('T');
                    logger.info('Read in Data_uplaoded');
                }
                else if (!data.Serial_number_of_device && line.includes('Serial_number_of_device')) {
                    data.Serial_number_of_device = getPlainValue(line);
                    logger.info(`Read in Serial Number: ${data.Serial_number_of_device}`);
                }
                else if (!inPhase && line.includes('Phase')) {
                    inPhase = true;
                    currentPhase = {};
                }
                else if (line.includes('voltage')) {
                    currentPhase.voltage = Number(getPlainValue(line));
                    logger.info('Read in voltage');
                }
                else if (line.includes('Current')) {
                    currentPhase.Current = Number(getPlainValue(line));
                    logger.info('Read in Current');
                }
                else if (line.includes('PF_corrected_for')) {
                    currentPhase.PF_corrected_for = Number(getPlainValue(line));
                    logger.info('Read in PF_corrected_for');
                }
                else if (line.includes('PF_currently')) {
                    currentPhase.PF_currently = Number(getPlainValue(line));
                    logger.info('Read in PF_currently');
                }
                else if (line.includes('Power_usage')) {
                    currentPhase.Power_usage = Number(getPlainValue(line));
                    logger.info('Read in Power_usage');
                }
                else if (line.includes('VAH_used_this_month_to_date')) {
                    currentPhase.VAH_used_this_month_to_date = Number(getPlainValue(line));
                    logger.info('Read in VAH_used_this_month_to_date');
                }
                else if (line.includes('VAH_saved_this_month_to_date')) {
                    currentPhase.VAH_saved_this_month_to_date = Number(getPlainValue(line));
                    logger.info('Read in VAH_saved_this_month_to_date');
                }
            }
            else if (inPhase) {
                inPhase = false;
                data.Phases.push(currentPhase);
            }
        }
    }
    writeTmp(data);
}
writeTmp = (data) => {
    uniqid = require('uniqid')((new Date()), '.tmp.json');
    path = './processing/' + uniqid;
    logger.info(`writing to tmp...`)
    fs.writeFile(path, JSON.stringify(data), 'utf8', (err) => {
        if (err) {
            logger.error('Could not write tmp file...' + err)
        }
        sendData(data, path)
    });
}
removeTmp = (name) => {
    fs.unlink(name, (err) => {
        logger.warn(`Could not Delete: '${name}' ERROR: `+ err);
    });
}
sendData = (data, tmpName) => {
    logger.info('sending data...');
    server = config.get('server');
    axios.post(server, data)
        .then((response) => {
            if (response.status === 200) {
                logger.info(`Data has been sent to the server successfully.`);
                removeTmp(tmpName);
            }
        })
        .catch((err) => {
            logger.error(`Could not send data... ERROR: ${err}`)
        })
}
module.exports = {
    process: function (file) {
        logger.info('File is being read...');
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                return logger.log(err);
            }
            logger.info('File is being proccessed...');
            fs.unlink(file, () => { })
            extractData(data);
        });
    }
}