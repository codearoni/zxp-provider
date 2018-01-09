'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

if (os.type() === 'Darwin') {
    console.log('Updating permissions for /bin/osx...');
    fs.chmod(path.resolve('./bin/osx/ZXPSignCmd'), 0755, function (err) {
        if (err) {
            throw err;
        } else {
            console.log('Permissions for /bin/osx set to 755.');
        }
    });
}
