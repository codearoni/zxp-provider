# zxp-provider

> A simple, lightweight provider for ZXPSignCmd - the tool used to sign Adobe extensions

[![Dependencies](http://img.shields.io/david/codearoni/zxp-provider.svg?branch=master)](https://david-dm.org/codearoni/zxp-provider)
[![Build Status](https://travis-ci.org/codearoni/zxp-provider.svg?branch=master)](https://travis-ci.org/codearoni/zxp-provider)
[![Build status](https://ci.appveyor.com/api/projects/status/m3igtkl3lishgr5l?svg=true)](https://ci.appveyor.com/project/codearoni/zxp-provider)
[![Coverage Status](https://coveralls.io/repos/github/codearoni/zxp-provider/badge.svg?branch=master)](https://coveralls.io/github/codearoni/zxp-provider?branch=master)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Installation

```bash
npm install zxp-provider
```

# Usage

zxp-provider has a simple interface for calling ZXPSignCmd. Most users will want to call zxp-provider with no arguments. This will return the latest version of ZXPSignCmd, for your current running operating system.

```javascript
const zxpProvider = require('zxp-provider');
const zxp = zxpProvider(); // returns the lastest version for the current operation system
```

If you would like to manually choose the version of ZXPSignCmd, an interface is provided for that. Please see CEP-Resources if you're unsure what versions are available. If you would like, zxp-provider also contains an Array of supported versions.

```javascript
const chosenVersion = zxpProvider.supportedVersions[0]; // select the oldest version of ZXPSignCmd
const zxp = zxpProvider({ version: chosenVersion });
```

If you would like to manually select the os, you can do that as well. zxp-provider exposes an object containing all of the supported versions.

```javascript
const win64 = zxpProvider.supportedPlatforms.win64; // manually select windows 64 bit
const zxp = zxpProvider({ os: win64 })
```

# Notes

[CEP-Resources](https://github.com/Adobe-CEP/CEP-Resources)
