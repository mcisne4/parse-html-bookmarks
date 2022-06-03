import { INSPECT_MAX_BYTES } from 'buffer'
import { readFileSync } from 'fs'
import path from 'path'

import { colors } from './lib/colors'

interface Bookmark {
    name: string
    url: string
    tags: string[]
}
interface BookmarkObject {
    [url: string]: {
        names: string[]
        url: string
        tags: string[]
    }
}
interface BookmarkObjectEntry {
    names: string[]
    url: string
    tags: string[]
}

export function parseBookmarks(
    filesPaths: string | string[],
    omitTags: string[] = []
) {
    /* Convert 'string' to 'string[]' */
    if (typeof filesPaths === 'string') {
        filesPaths = [filesPaths]
    }

    /* Filter valid filenames entries */
    filesPaths = filesPaths
        .filter(filename => filename.length > 0)
        .map(filename => path.resolve(filename))

    /* Bookmarks Object */
    let urlToBookmars: BookmarkObject = {}

    /* Loop through Filenames */
    filesPaths.forEach(filename => {
        let fileData: string = ''

        /* Read File */
        try {
            fileData = readFileSync(filename, { encoding: 'utf8' })
        } catch (error) {
            console.error(
                `${colors.red + colors.invert} Error reading the file: ${
                    colors.revert
                } ${filename}\n`,
                error
            )
        }

        /* Split File Data */
        const dataArray = fileData.split('\r\n').map(line => line.trim())

        /* Loop Lines */
        let tags: string[] = []
        dataArray.forEach(line => {
            // -- Add Tag --
            if (line.includes('<H3')) {
                const spliceStart: number = line.indexOf('">') + 2
                const spliceEnd: number = line.indexOf('</H3>')
                const tagName: string = line.slice(spliceStart, spliceEnd)
                tags.push(tagName)
            }
            // -- Remove Tag --
            if (line.includes('</DL><p>')) {
                tags.pop()
            }
            // -- Read Bookmark --
            if (line.includes('<DT><A')) {
                const nameStart: number = line.indexOf('">') + 2
                const nameEnd: number = line.indexOf('</A>')
                const name: string = line.slice(nameStart, nameEnd)
                const hrefStart: number = line.indexOf('HREF="') + 6
                const hrefEnd: number = line.indexOf('"', hrefStart + 1)
                const href: string = line.slice(hrefStart, hrefEnd)

                let bookmarkEntry = urlToBookmars[href] || {
                    names: [],
                    url: href,
                    tags: [],
                }
                !bookmarkEntry.names.includes(name) &&
                    bookmarkEntry.names.push(name)
                tags.forEach(tag => {
                    !bookmarkEntry.tags.includes(tag) &&
                        bookmarkEntry.tags.push(tag)
                })

                urlToBookmars[href] = bookmarkEntry
            }
        })
    })

    /* Filter Bookmarks */
    let entries = Object.values(urlToBookmars)
        // -- Remove `tags: ['Trash']` --
        .filter(item => {
            if (item.tags.includes('Trash') && item.tags.length === 1) {
                return false
            } else {
                return true
            }
        })
        .map(entry => {
            entry = _removeTags(entry, ['Trash'])
            return entry
        })
        // -- Remove 'omitTags' --
        .map(entry => {
            entry = _removeTags(entry, omitTags)
            return entry
        })

    /* Format Results */
    let bookmarks: Bookmark[] = []
    let duplicates: BookmarkObjectEntry[] = []
    entries.forEach(entry => {
        if (entry.names.length === 1) {
            bookmarks.push({
                name: entry.names[0],
                url: entry.url,
                tags: entry.tags,
            })
        } else {
            duplicates.push(entry)
        }
    })

    /* Return */
    return { bookmarks, duplicates }
}

function _removeTags(
    bookmarkObjectEntry: BookmarkObjectEntry,
    removeTagNames: string | string[]
) {
    /* Convert 'string' to 'string[]' */
    if (typeof removeTagNames === 'string') {
        removeTagNames = [removeTagNames]
    }

    /* Remove Tags */
    bookmarkObjectEntry.tags = bookmarkObjectEntry.tags.filter(
        name => !removeTagNames.includes(name)
    )

    return bookmarkObjectEntry
}
