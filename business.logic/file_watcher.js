hound = require('hound');
logger = require('./logger.js')
watcher = {};

module.exports = {
    setup: function (path) {
        logger.info('Setting up File Watcher...')
        watcher = hound.watch(path);

        watcher.on('create', function (file, stats) {
            try {
                logger.log(file + ' was created');
            }
            catch (e) {
                logger.error('create error', e)
            }
        })

        watcher.on('change', function (file, stats) {
            try {
                logger.log(file + ' was changed')
            }
            catch (e) {
                logger.error('change error', e)
            }
        })
        watcher.on('delete', function (file) {
            try {
                logger.log(file + ' was deleted')
            }
            catch (e) {
                logger.error('delete error', e)
            }
        })
    },
    dispose: function () {
        watcher.clear();
    }
};