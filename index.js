var pkg = exports;
var path = require('path');
var fs = require('fs');

var cache = {};

// TODO: Eager load cache from current filename and traversing paths.

function doCache(uncachedFiles, value) {
	uncachedFiles.forEach(function(filename) {
		cache[filename] = value;
	});

	return value; // TODO: Return copy, so the cache is not modified
}

// Resolve package info given a filename.
pkg.resolve = function(filename) {
	return pkg.resolveDir(path.dirname(filename));
};

// Resolve package info given a directory.
pkg.resolveDir = function(dir) {
	dir = path.resolve(dir);

	var uncached = [];

	while (true) {
		var pkgFile = path.normalize(dir + '/package.json');
		if (pkgFile in cache) {
			return doCache(uncached, cache[pkgFile]);
		}

		uncached.push(pkgFile);

		var pkgContent = null;
		try {
			pkgContent = fs.readFileSync(pkgFile, 'utf8');
		} catch (error) {
			if (error.code !== 'ENOENT') throw error;
		}

		if (pkgContent) {
			var pkgInfo = null;
			try {
				pkgInfo = JSON.parse(pkgContent);
			} catch (error) {
				if (!(error instanceof SyntaxError)) throw error;
			}

			return doCache(uncached, pkgInfo || {});
		}

		var parentDir = path.dirname(dir);
		if (parentDir === dir) return doCache(uncached, null);
		dir = parentDir;
	}
};
