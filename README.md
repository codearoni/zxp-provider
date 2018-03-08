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

zxp-provider has a simple interface for calling ZXPSignCmd. Most users will want to use the 'bin' property, which will provide the zxp binary appropriate to your OS.

```javascript
var zxp = require('zxp-provider').bin;
```

If you would like to manually choose the executable, zxp-provider provides an interface for that as well.

```javascript
var zxpWin32 = require('zxp-provider').win32;

var zxpWin64 = require('zxp-provider').win64;

var zxpOsx = require('zxp-provider').osx;
```

# Notes

zxp-provider v1.0.x - ZxpSignCmd v3.0.30

zxp-provider v1.1.x - ZxpSignCmd v4.0.7

[CEP-Resources](https://github.com/Adobe-CEP/CEP-Resources)
