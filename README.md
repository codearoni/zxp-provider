# zxp-provider

> A simple, lightweight provider for ZXPSignCmd - the tool used to sign Adobe extensions

[![Dependencies](http://img.shields.io/david/codearoni/zxp-provider.svg?branch=master)](https://david-dm.org/codearoni/zxp-provider)

[![Build Status](https://travis-ci.org/codearoni/zxp-provider.svg?branch=master)](https://travis-ci.org/codearoni/zxp-provider)


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
zxp-provider uses the latest version of ZXPSignCmd (as of 04/2016) v3.0.30

[CEP-Resources](https://github.com/Adobe-CEP/CEP-Resources)

# License
MIT
