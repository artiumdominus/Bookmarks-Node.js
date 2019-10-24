# Bookmarks-Node.js

A simple bookmarking application to have your favorite links stored independent of browser.

## Team:
- [Pedro Basilio de Camargo Neto](https://github.com/artiumdominus)
- [Thiago dos Santos Silva](https://github.com/thiagosantos346)

## Model:
```
User:
    username    : string
    email       : string
    password    : string

Folder:
    id          : long
    name        : string
    superfolder : Folder
    subfolders  : [Folder]
    user        : User

Tag:
    name        : string

Bookmark:
    name        : string
    URL         : string
    favicon     : img
    description : string
    tags        : [Tag]
    folder      : Folder
```

## MongoDB Schema
```ruby
db.accounts:
{
    _id: ID
    username: String,
    password: String,
    email: String,
    tag_enum: [String],
    folders: [
        {
            id: Int,
            name: String,
            bookmarks: [
                {
                    name: String,
                    url: String,
                    favicon: ???,
                    description: String,
                    tags: [Int],
                },
            ],
            subfolders: [
                ... same as in folders ...
            ]
        },
    ]
}
```

## Routes:

| URL                      | Purpose                                     |
|--------------------------|---------------------------------------------|
| /                        | Redirect to /login/ or /bookmarks/          |
| /login/                  | The Login screen                            |
| /bookmarks/              | The bookmarks panel open in the root folder |
| /bookmarks/?id=&lt;id&gt;| The bookmarks panel open in specific folder |
| /api-graphql/            | Endpoint of a GraphQL API                   |
| /api-rest/               | The main endpoint of a RESTful API          |

## Commands

**install dependencies:**
` $ npm install `

**run the app:**
` $ DEBUG=bookmarks-node.js * npm start `
