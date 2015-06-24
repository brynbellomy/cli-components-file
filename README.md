
# cli-components / file

Misc. file-related tools for making CLI stuff.

# installing

```sh
$ npm install cli-components-file --save
```

# using

In lieu of a README, here's the `.d.ts` file, verbatim:

```typescript
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
```


# authors/contributors

- Bryn Austin Bellomy (<bryn.bellomy@gmail.com>)

