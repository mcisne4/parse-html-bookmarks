import { parseBookmarks } from '../src/index'

/* dotenv */
import { config } from 'dotenv'
config()

/* Filenames from Environmental Variables */
const file1: string = process.env.FILE1 || ''
const file2: string = process.env.FILE2 || ''
const file3: string = process.env.FILE3 || ''
const file4: string = process.env.FILE4 || ''
const file5: string = ''
const file6: string = ''

const results = parseBookmarks(
    [file1, file2, file3, file4, file5, file6],
    ['Bookmarks', 'Temp']
)

console.log(results.bookmarks)
console.log(results.duplicates)
