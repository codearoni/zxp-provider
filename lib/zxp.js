'use strict';

const os = require('os');
const path = require('path');
const ZXP_NAME = 'ZXPSignCmd';
const ZXP_HOME = path.join(__dirname, '..', 'bin');
const WIN_EXT = '.exe';

/**
 * Adobe doesn't support Linux, and attempt to run ZxpSignCmd on those platform(s) have always failed
 */
const OS_TYPE = {
    osx: 'osx',
    win32: 'win32',
    win64: 'win64'
};

/**
 * Version of ZxpSignCmd
 * Order matters! Oldest => latest
 */
const ZXP_VERSION = [
    '3.0.19',
    '3.0.30',
    '4.0.7',
    '4.1.1',
    '4.1.3'
];

/**
 * Utility method that ensures support for whitespace
 * @param {*} str 
 */
const quoteWrap = (str) => {
    return '"' + str + '"';
};

const getCurrentOs = () => {
    const platform = os.platform();
    const arch = os.arch();
    if (platform === 'win32') {
        if (arch === 'x64') {
            return OS_TYPE.win64;
        }
        return OS_TYPE.win32;
    } else {
        return OS_TYPE.osx;
    }
};

/**
 * Entry point for function
 */
module.exports = (opts) => {
    opts = opts || {};
    // default to latest
    let selectedVersion = opts.version ? opts.version : ZXP_VERSION[ZXP_VERSION.length - 1];
    // default to current executing os
    let selectedOs = opts.os ? opts.os : getCurrentOs();
    // set .exe extension for windows 
    let ext = selectedOs === OS_TYPE.osx ? '' : WIN_EXT;
    
    if (!ZXP_VERSION.includes(selectedVersion)) {
        throw new Error('Invalid version was provided.');
    }

    if (!OS_TYPE[selectedOs]) {
        throw new Error('Invalid os was provided.');
    }

    const zxpPath = path.join(ZXP_HOME, selectedVersion, selectedOs, ZXP_NAME + ext);

    return quoteWrap(zxpPath);
 };

module.exports.supportedPlatforms = OS_TYPE;

module.exports.supportedVersions = ZXP_VERSION;