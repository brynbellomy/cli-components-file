
/// <reference path='../when/when.d.ts'

declare module 'cli-components-file' {
    export = CliComponentsFileModule;
}

declare module CliComponentsFileModule
{
    /**
        Creates a backup of the file at `filepath` and places it in `backupDir`.  No compression is used.
     */
    export function createBackup (filepath: string, backupDir: string): Promise<string>;
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
    export function depthSortFilepaths(filepaths: string[]): string[];
}

