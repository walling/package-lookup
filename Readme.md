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
