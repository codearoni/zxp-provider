'use strict';

var path = require('path'),
    zxp = require(path.join(__dirname, '..', 'lib', 'zxp')),
    expect = require('chai').expect;

describe('zxp.js', function () {

    it('Should populate the path based on the os', function () {
        expect(zxp.bin.length).to.not.equal(0);
    });

    it('Should populate the path for win32', function () {
        expect(zxp.win32.length).to.not.equal(0);
    });

    it('Should populate the path for win64', function () {
        expect(zxp.win64.length).to.not.equal(0);
    });

    it('Should populate the path for osx', function () {
        expect(zxp.osx.length).to.not.equal(0);
    });
});
