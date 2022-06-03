import path from 'path'
import {} from 'fs'

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
