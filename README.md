# Parse Vivaldi Bookmarks

The library provides a utility function to extract bookmarks from exported Vivaldi bookmark `*.html` files. Bookmarks are returned in JavaScript object format.

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

-   `filePaths` - The full path to exported Vivaldi bookmarks `*.html` file(s)
-   `omitTags` - A list of tags that should be ommited from the results
-   results.`bookmarks` - A list of unique converted _Bookmarks_
-   results.`duplicates` - A list of duplicate _Bookmarks_ with different _names_ for a specific `url`.
-   `Bookmark.name` - The title of bookmark inside of Vivaldi
-   `BookmarkDuplicate.name` - A list of Vivaldi bookmark titles used for the `url`. Bookmarks are organized based on `url`
-   `Bookmark.url`, `BookmarkDuplicate.url` - The `url` for the Vivaldi bookmark
-   `Bookmark.tags`, `BookmarkDuplicate.tags` - A list of tags. Each Vivaldi bookmark folder is referenced as a tag. Each nested folder adds an additional tag to the list. Each Vivaldi bookmark `url` duplicate adds to the shared `tags` list.

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
