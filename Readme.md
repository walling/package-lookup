package-lookup
==============

Info about the package given a filename.

Install:

```bash
npm install package-lookup
```

Usage:

```javascript
var pkg = require('package-lookup');

// Display current package: The two gives the same result.
console.log(pkg.resolve(__filename));
console.log(pkg.resolveDir(__dirname));

// Info about socket.io (if it's in the path).
console.log(pkg.resolve(require.resolve('socket.io')));
```

Functions:

 *  pkg.resolve(filename)
 *  pkg.resolveDir(dirname)

The package info includes the properties `_filename` and `_dirname` that gives the filename and directory of the package.json file.
