var path = require('path');
var fs = require('fs-extra');
var when = require('when');
var whenNode = require('when/node');
var fsp = whenNode.liftAll(fs);
/**
    Creates a backup of the file at `filepath` and places it in `backupDir`.  No compression is used.
 */
function createBackup(filepath, backupDir) {
    var filename = path.basename(filepath);
    var dateStr = new Date().toString().replace(/[^a-zA-Z0-9]/g, '-');
    var absFilepath = path.resolve(filepath);
    var parentDirParts = path.dirname(absFilepath).split('/');
    var parentDir = parentDirParts[parentDirParts.length - 1];
    var backupFilename = path.join(backupDir, filename + "--" + parentDir + "--" + dateStr).replace(/\-+$/, '');
    return fsp.ensureDir(backupDir)
        .then(function () {
        return fs.existsSync(absFilepath)
            ? fsp.copy(absFilepath, backupFilename)
                .then(function () { backupFilename; })
            : when.reject(new Error("The file \"" + filepath + " was not found.\""));
    });
}
exports.createBackup = createBackup;
/**
    Sorts the given `filepaths` so that

    1. the root-most paths are first, and...
    2. children of a directory appear immediately after that directory.
    3. Conflicts are resolved through simple alphabetical comparison.

    The resulting array is analogous to the directory traversal order of a
    program like `find` or `tree`.

    Note that this function does not interact with the filesystem — it is simply
    a path comparison.
 */
function depthSortFilepaths(filepaths) {
    function compareStrings(a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    }
    function isChildOf(filepath, maybeParent) {
        return filepath.indexOf(maybeParent) === 0;
    }
    return filepaths.sort(function (a, b) {
        if (a.length == b.length && isChildOf(a, b) == false) {
            return compareStrings(a, b);
        }
        else if (isChildOf(a, b)) {
            return -1;
        }
        else if (isChildOf(b, a)) {
            return 1;
        }
        else {
            return compareStrings(a, b);
        }
    });
}
exports.depthSortFilepaths = depthSortFilepaths;
//# sourceMappingURL=index.js.map