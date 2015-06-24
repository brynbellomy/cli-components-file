
import * as path from 'path'
import * as fs from 'fs-extra'
import * as when from 'when'
import * as whenNode from 'when/node'

const fsp = whenNode.liftAll(fs)

export {
    createBackup,
    depthSortFilepaths,
}


/**
    Creates a backup of the file at `filepath` and places it in `backupDir`.  No compression is used.
 */
function createBackup (filepath: string, backupDir: string): when.Promise<string> {
    const filename = path.basename(filepath)
    const dateStr  = new Date().toString().replace(/[^a-zA-Z0-9]/g, '-')

    const absFilepath     = path.resolve(filepath)
    const parentDirParts  = path.dirname(absFilepath).split('/')
    const parentDir       = parentDirParts[parentDirParts.length - 1]
    const backupFilename  = path.join(backupDir, `${filename}--${parentDir}--${dateStr}`).replace(/\-+$/, '')

    return   fsp.ensureDir(backupDir)
                .then(() => {
                    return fs.existsSync(absFilepath)
                                    ? fsp.copy(absFilepath, backupFilename)
                                         .then(() => { backupFilename })
                                    :  when.reject(new Error(`The file "${filepath} was not found."`))
               })
}


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
function depthSortFilepaths (filepaths:string[]): string[] {

    function compareStrings (a: string, b: string): number {
        if (a < b) { return -1 }
        else if (a > b) { return 1 }
        else { return 0 }
    }

    function isChildOf (filepath:string, maybeParent:string): boolean {
        return filepath.indexOf(maybeParent) === 0
    }

    return filepaths.sort((a:string, b:string) => {
        if (a.length == b.length && isChildOf(a, b) == false) {
            return compareStrings(a, b)
        }
        else if (isChildOf(a, b)) {
            return -1
        }
        else if (isChildOf(b, a)) {
            return 1
        }
        else {
            return compareStrings(a, b)
        }
    })
}



