'use strict';

const util = require('util');
const fs = require('fs');
const path = require('path');
const os = require('os');
const readdir = util.promisify(fs.readdir);
const chmod = util.promisify(fs.chmod);

const ZXP_SIGN_CMD = 'ZXPSignCmd';
const BIN_DIR = path.resolve('./bin');
const PERM_CODE = '755';

const chmodBinary = async (version) => {
    const zxpPath = path.join(BIN_DIR, version, 'osx', ZXP_SIGN_CMD);
    await chmod(zxpPath, PERM_CODE);
    console.log(ZXP_SIGN_CMD + ' perms set to ' + PERM_CODE + ' at: ' + zxpPath);
};

(async () => {
    if (os.type() === 'Darwin') {
        console.log('Updating permissions for osx binaries.');
        const versionDirectories = await readdir(BIN_DIR);
        const chmodSet = [];
        versionDirectories.forEach((version) => {
            chmodSet.push(chmodBinary(version));
        });

        await Promise.all(chmodSet);
    }
})();
