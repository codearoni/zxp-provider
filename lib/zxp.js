"use strict";

var os = require('os'),
    path = require('path'),
    ZXP_NAME = 'ZXPSignCmd',
    ZXP_HOME = path.join(__dirname, '..', 'bin'),
    WIN32 = path.join(ZXP_HOME, 'win32', ZXP_NAME),
    WIN64 = path.join(ZXP_HOME, 'win64', ZXP_NAME),
    OSX = path.join(ZXP_HOME, 'osx', ZXP_NAME),
    quoteWrap = function (str) {
        return '"' + str + '"';
    };

module.exports = {
    osx: (function () {
        return quoteWrap(OSX);
    }()),
    win32: (function () {
        return quoteWrap(WIN32);
    }()),
    win64: (function () {
        return quoteWrap(WIN64);
    }()),
    bin: (function () {

        var currentOs = os.platform(),
            osArch = os.arch();

        if (currentOs === 'win32') {
            if (osArch === 'x64') {
                return quoteWrap(WIN64);
            } else {
                return quoteWrap(WIN32);
            }
        } else {
            return quoteWrap(OSX);
        }
    }())
};