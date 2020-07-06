hound = require('hound');
logger = require('./logger.js')
watcher = {};
fp = require('./file_processer.js')

module.exports = {
    setup: function (path) {
        logger.info('Setting up File Watcher...')
        watcher = hound.watch(path);

        watcher.on('create', function (file, stats) {
            try {
                logger.info(file + ' was created');
                fp.process(file);
            }
            catch (e) {
                logger.error('create error:' + e)
            }
        })
    },
    dispose: function () {
        watcher.clear();
    }
};