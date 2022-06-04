import { expect } from 'chai'
import { parseBookmarks } from '../src/index'
import { join } from 'path'

import { Bookmark, BookmarkObjectEntry } from '../src/index'

process.env.MODE = 'testing'

const file1 = join(__dirname, 'test_bookmarks/File_A.html')
const file2 = join(__dirname, 'test_bookmarks/File_B.html')
const file3 = join(__dirname, 'test_bookmarks/File_X.html')
const file4 = ''

describe('Testing Filenames:', () => {
    it("passing 'file1' should not throw an error", () => {
        expect(() => parseBookmarks(file1)).to.not.throw()
    })
    it("passing '[file1, file2]' should not throw an error", () => {
        expect(() => parseBookmarks([file1, file2])).to.not.throw()
    })
    it("passing 'file3' should fail", () => {
        expect(() => parseBookmarks(file3)).to.throw('Error reading file')
    })
    it("passing 'file4' should not throw an error", () => {
        expect(() => parseBookmarks(file4)).to.not.throw()
    })
})

describe("Testing data from 'file1':", () => {
    let bookmarks: Bookmark[]
    let duplicates: BookmarkObjectEntry[]

    beforeEach(() => {
        const data = parseBookmarks(file1)
        bookmarks = data.bookmarks
        duplicates = data.duplicates
    })

    it("'bookmarks' should be an array with '10' items", () => {
        expect(bookmarks.length).to.equal(10)
    })
    it("'duplicates' should be an array with '0' items", () => {
        expect(duplicates.length).to.equal(0)
    })
    it("'bookmarks[0].name' should equal 'Site 1'", () => {
        expect(bookmarks[0].name).to.equal('Site 1')
    })
    it("'bookmarks[1].url'  should equal 'https://www.site2.com/'", () => {
        expect(bookmarks[1].url).to.equal('https://www.site2.com/')
    })
    it("'bookmarks[2].tags' should equal '[Bookmarks, Group 1 - File A]'", () => {
        expect(bookmarks[2].tags).to.eql(['Bookmarks', 'Group 1 - File A'])
    })
})

describe("Testing data from '[file1, file2]':", () => {
    let bookmarks: Bookmark[]
    let duplicates: BookmarkObjectEntry[]

    beforeEach(() => {
        const data = parseBookmarks([file1, file2])
        bookmarks = data.bookmarks
        duplicates = data.duplicates
    })

    it("'bookmarks' should be an array with '10' items", () => {
        expect(bookmarks.length).to.equal(10)
    })
    it("'duplicates' should be an array with '5' items", () => {
        expect(duplicates.length).to.equal(5)
    })
    it("'bookmarks[0].name' should equal 'Site 6'", () => {
        expect(bookmarks[0].name).to.equal('Site 6')
    })
    it("'bookmarks[5].url'  should equal 'https://www.site11.com/'", () => {
        expect(bookmarks[5].url).to.equal('https://www.site11.com/')
    })
    it("'bookmarks[2].tags' should equal '[Bookmarks, Group2, Group 1 - File B]'", () => {
        expect(bookmarks[2].tags).to.eql([
            'Bookmarks',
            'Group 2',
            'Group 2 - File B',
        ])
    })
    it("'bookmarks[6].tags' should equal '[Bookmarks, Group 1 - File B, Group 3]'", () => {
        expect(bookmarks[6].tags).to.eql([
            'Bookmarks',
            'Group 1 - File B',
            'Group 3',
        ])
    })
    it("'duplicates[0].name' should equal '[Site 1, Site 1B]'", () => {
        expect(duplicates[0].names).to.eql(['Site 1', 'Site 1B'])
    })
    it("'duplicates[1].url'  should equal 'https://www.site2.com/'", () => {
        expect(duplicates[1].url).to.equal('https://www.site2.com/')
    })
    it("'duplicates[2].tags' should equal '[Bookmarks, Group 1 - File A, Group 1 - File B]'", () => {
        expect(duplicates[2].tags).to.eql([
            'Bookmarks',
            'Group 1 - File A',
            'Group 1 - File B',
        ])
    })
})

describe("Testing data from 'file4':", () => {
    let bookmarks: Bookmark[]
    let duplicates: BookmarkObjectEntry[]

    beforeEach(() => {
        const data = parseBookmarks(file4)
        bookmarks = data.bookmarks
        duplicates = data.duplicates
    })

    it("'bookmarks' should be an array with '0' items", () => {
        expect(bookmarks.length).to.equal(0)
    })
    it("'duplicates' should be an array with '0' items", () => {
        expect(duplicates.length).to.equal(0)
    })
})
