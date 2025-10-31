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
 * Version of ZxpSignCmd with supported OS types
 * Each version can support one or more OS types
 */
const ZXP_VERSION = {
    '3.0.19': [OS_TYPE.osx, OS_TYPE.win32, OS_TYPE.win64],
    '3.0.30': [OS_TYPE.osx, OS_TYPE.win32, OS_TYPE.win64],
    '4.0.7': [OS_TYPE.osx, OS_TYPE.win32, OS_TYPE.win64],
    '4.1.1': [OS_TYPE.osx, OS_TYPE.win32, OS_TYPE.win64],
    '4.1.103': [OS_TYPE.win32, OS_TYPE.win64],
    '4.1.2': [OS_TYPE.osx],
    '4.1.3': [OS_TYPE.osx, OS_TYPE.win32, OS_TYPE.win64]
};

/**
 * Get all supported versions as an array (for backward compatibility)
 * Order matters! Oldest => latest
 */
const getSupportedVersions = () => {
    return Object.keys(ZXP_VERSION);
};

/**
 * Check if a version supports a specific OS type
 * @param {string} version - Version to check
 * @param {string} osType - OS type to check
 * @returns {boolean} - True if version supports the OS type
 */
const isOsSupportedByVersion = (version, osType) => {
    return ZXP_VERSION[version] && ZXP_VERSION[version].includes(osType);
};

/**
 * Get the latest version that supports a specific OS type
 * @param {string} osType - OS type to find latest version for
 * @returns {string} - Latest version supporting the OS type
 */
const getLatestVersionForOs = (osType) => {
    const supportedVersions = getSupportedVersions();
    // Iterate backwards to get the latest version
    for (let i = supportedVersions.length - 1; i >= 0; i--) {
        const version = supportedVersions[i];
        if (isOsSupportedByVersion(version, osType)) {
            return version;
        }
    }
    throw new Error(`No supported version found for OS type: ${osType}`);
};

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
    // default to current executing os
    let selectedOs = opts.os ? opts.os : getCurrentOs();
    // default to latest version for the selected OS
    let selectedVersion = opts.version ? opts.version : getLatestVersionForOs(selectedOs);
    // set .exe extension for windows 
    let ext = selectedOs === OS_TYPE.osx ? '' : WIN_EXT;

    if (!ZXP_VERSION[selectedVersion]) {
        throw new Error('Invalid version was provided.');
    }

    if (!OS_TYPE[selectedOs]) {
        throw new Error('Invalid os was provided.');
    }

    if (!isOsSupportedByVersion(selectedVersion, selectedOs)) {
        throw new Error(`Version ${selectedVersion} does not support OS type ${selectedOs}`);
    }

    const zxpPath = path.join(ZXP_HOME, selectedVersion, selectedOs, ZXP_NAME + ext);

    return quoteWrap(zxpPath);
};

module.exports.supportedPlatforms = OS_TYPE;

module.exports.supportedVersions = getSupportedVersions();

module.exports.isOsSupportedByVersion = isOsSupportedByVersion;

module.exports.getLatestVersionForOs = getLatestVersionForOs;

module.exports.getSupportedOsTypesForVersion = (version) => {
    return ZXP_VERSION[version] || [];
};