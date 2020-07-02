hound = require('hound');
watcher = {};

module.exports = {
    setup: function (path) {
        console.log('Setting up Overseer...');
        watcher = hound.watch(path);

        watcher.on('create', function (file, stats) {
            try {
                console.log(file + ' was created');
            }
            catch (e) {
                console.log('create error', e)
            }
        })
        
        watcher.on('change', function (file, stats) {
            try {
                console.log(file + ' was changed')
            }
            catch (e) {
                console.log('change error', e)
            }
        })
        watcher.on('delete', function (file) {
            try {
                console.log(file + ' was deleted')
            }
            catch (e) {
                console.log('delete error', e)
            }
        })
    },
    dispose: function () {
        watcher.clear();
    }
};