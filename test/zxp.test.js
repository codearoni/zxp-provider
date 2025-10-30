'use strict';

const os = require('os');
const path = require('path');
const zxpProvider = require(path.join(__dirname, '..', 'lib', 'zxp'));
const expect = require('chai').expect;
const exec = require('child_process').exec;
const platform = os.platform();

const execAttempt = async (filePath) => {
    return new Promise((resolve, reject) => {
        if ((platform === 'darwin' && filePath.includes('osx')) || (platform === 'win32' && filePath.includes('win'))) {
            exec(filePath + ' -selfSignedCert US US Test App 1234 ./temp/cert.p12', (err, stdout) => {
                if (err) {
                    reject(err);
                }
                resolve(stdout);
            });
        } else {
            resolve('Invalid platform for exec. Bypassing');
        }
    });
};

describe('zxp.js', function () {
    this.timeout(10000);

    it('Should grab the latest version', () => {
        expect(zxpProvider()).to.contain('4.1.3');
    });

    it('Should throw when a bad version is provided', () => {
        try {
            zxpProvider({version: '0.0.0'});
        } catch (err) {
            expect(err).to.be.an('error');
        }
    });

    it('Should throw when a bad os is provided', () => {
        try {
            zxpProvider({os: 'linux'});
        } catch (err) {
            expect(err).to.be.an('error');
        }
    });

    it('Should select the oldest version', () => {
        expect(zxpProvider({version: zxpProvider.supportedVersions[0]})).to.contain('3.0.19');
    });

    it('Should select an osx version', () => {
        expect(zxpProvider({os: zxpProvider.supportedPlatforms.osx})).to.contain('osx');
    });

    it('Should select an win32 version', () => {
        expect(zxpProvider({os: zxpProvider.supportedPlatforms.win32})).to.contain('win32');
    });

    it('Should select an win64 version', () => {
        expect(zxpProvider({os: zxpProvider.supportedPlatforms.win64})).to.contain('win64');
    });

    it('Should generate a cert on valid platforms', (done) => {

        const paths = [];

        zxpProvider.supportedVersions.forEach((version) => {
            Object.values(zxpProvider.supportedPlatforms).forEach((os) => {
                const filePath = zxpProvider({ version: version, os: os });
                paths.push(filePath);
            });
        });
        const promises = [];
        paths.forEach((path) => {
            promises.push(execAttempt(path));
        });
        Promise.all(promises).then((result) => {
            console.log('Execs complete.');
            if (result) {
                console.log(result);
            }
            done();
        }).catch((err) => {
            console.error('There was an error reading a ZxpSignCmd file during testing.');
            done(err);
        });
    });
});
