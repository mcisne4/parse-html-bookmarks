# Parse Exported HTLM Browser Bookmarks

The library provides a utility function to extract bookmark data from exported browser `*.html` files. Bookmarks are returned as a JavaScript object.

The exported `*.html` bookmark file must be in the format:

```html
<DL><p>
    <DT><H3 ADD_DATE="1234567890" LAST_MODIFIED="1234567890">Category</H3>
    <DL><p>
        <DT><A HREF="https://www.somelink.com/">Link Title</A>
        <DT><A HREF="https://www.anotherlink.com/">Link Title</A>
        <DT><H3 ADD_DATE="1234567890" LAST_MODIFIED="1234567890">Sub Category</H3>
        <DL><p>
            <DT><A HREF="https://www.link3.com/">Link Title</A>
            <DT><A HREF="https://www.link4.com/">Link Title</A>
        </DL><p>
    </DL><p>
</DL><p>
```

Currently tested browsers that support this format include _Firefox_, _Chrome_, and _Vivaldi_

## Interface

```ts
function parseBookmarks(
    filesPaths: string | string[],
    omitTags: string[] = []
): {
    bookmarks: Bookmark[]
    duplicates: BookmarkObjectEntry[]
}

interface Bookmark {
    name: string
    url: string
    tags: string[]
}

interface BookmarkDuplicate {
    names: string[]
    url: string
    tags: string[]
}
```

-   `filePaths` - The full path to exported browser bookmarks `*.html` file(s)
-   `omitTags` - A list of tags that should be ommited from the results
-   results.`bookmarks` - A list of unique converted _Bookmarks_
-   results.`duplicates` - A list of duplicate _Bookmarks_ with different _names_ for a specific `url`.
-   `Bookmark.name` - The title of bookmark inside of the browser
-   `BookmarkDuplicate.name` - A list of browser bookmark titles used for the `url`. Bookmarks are organized based on `url`
-   `Bookmark.url`, `BookmarkDuplicate.url` - The `url` for the browser bookmark
-   `Bookmark.tags`, `BookmarkDuplicate.tags` - A list of tags. Each browser bookmark folder is referenced as a tag. Each nested folder adds an additional tag to the list. Each browser bookmark `url` duplicate adds to the shared `tags` list.

## Example

```ts
import { parseBookmarks, Bookmark, BookmarkDuplicate } from 'src/index'

import { join } from 'path'
const fileA = join(__dirname, 'bookmarks_7_1_21.html')
const fileB = join(__dirname, 'bookmarks_6_4_22.html')

const {
    bookmarks: Bookmark[],
    duplicates: BookmarkDuplicate[]
} = parseBookmarks([file1, file2])
```
