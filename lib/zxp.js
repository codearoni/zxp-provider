'use strict';

var fs = require('fs'),
    os = require('os'),
    path = require('path'),
    ZXP_NAME = 'ZXPSignCmd',
    ZXP_HOME = path.join(__dirname, '..', 'bin'),
    WIN32 = path.join(ZXP_HOME, 'win32', ZXP_NAME),
    WIN64 = path.join(ZXP_HOME, 'win64', ZXP_NAME),
    OSX = path.join(ZXP_HOME, 'osx', ZXP_NAME);

module.exports = {
    osx: (function () {
        return OSX;
    }()),
    win32: (function () {
        return WIN32;
    }()),
    win64: (function () {
        return WIN64;
    }()),
    bin: (function () {
        var currentOs = os.platform(),
            osArch = os.arch();

        if (currentOs === 'win32') {
            if (osArch === 'x64') {
                return WIN64;
            } else {
                return WIN32;
            }
        } else {
            return OSX;
        }
    }())
};
