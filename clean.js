const rimraf = require('rimraf');

rimraf('tmp', (err) => {
    if (err) { console.log('There was an error cleaning up the tmp directory\n', err); }
});