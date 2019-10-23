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
