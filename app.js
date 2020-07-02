logger = require('./business.logic/logger.js');
logger.info('Starting Overseer...');
oversee = require('./business.logic/file_watcher.js');
oversee.setup('./drop_location');