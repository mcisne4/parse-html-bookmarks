import path from 'path'
import { readFileSync } from 'fs'

/* dotenv */
import { config } from 'dotenv'
config()

/* Get filenames from environmental variables */
let bookmarkHTMLs: string[] = [
    process.env.FILE1 || '',
    process.env.FILE2 || '',
    process.env.FILE3 || '',
]

/* Filter valid filenames entries */
bookmarkHTMLs = bookmarkHTMLs
    .filter(file => file.length > 0)
    .map(file => path.resolve(file))

/* Bookmarks List */
interface Bookmark {
    name: string
    href: string
    tags: string[]
}
let bookmarksList: Bookmark[] = []
let duplicateList: Bookmark[] = []
let allBookmarks: Bookmark[] = []

/* Loop Files */
bookmarkHTMLs.forEach(filename => {
    // -- Read File --
    const fileData = readFileSync(filename, { encoding: 'utf8' })

    // -- Split File Data --
    let dataArray = fileData.split('\r\n').map(line => line.trim())

    // -- Loop Lines --
    let _tags: string[] = []
    dataArray.forEach(line => {
        if (line.includes('<H3')) {
            const spliceStart: number = line.indexOf('">') + 2
            const spliceEnd: number = line.indexOf('</H3>')
            const tagName: string = line.slice(spliceStart, spliceEnd)
            _tags.push(tagName)
            // console.log('tags++:', _tags)
        }
        if (line.includes('</DL><p>')) {
            _tags.pop()
            // console.log('tags--:', _tags)
        }
        if (line.includes('<DT><A')) {
            const nameStart: number = line.indexOf('">') + 2
            const nameEnd: number = line.indexOf('</A>')
            const name: string = line.slice(nameStart, nameEnd)
            const hrefStart: number = line.indexOf('HREF="') + 6
            const hrefEnd: number = line.indexOf('"', hrefStart + 1)
            const href: string = line.slice(hrefStart, hrefEnd)
            allBookmarks.push({
                name,
                href,
                tags: [..._tags],
            })
        }
    })
})
console.log(allBookmarks)
