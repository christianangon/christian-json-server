## Deploy JSON Server to Vercel

A template to deploy [JSON Server](https://github.com/typicode/json-server) to [Vercel](https://vercel.com), allow you to run fake REST API online!

Demo from this repository: 

1. https://christian-json-server-6ra1.vercel.app
2. https://christian-json-server-6ra1.vercel.app/api/articles/all

![Powered by Vercel](https://images.ctfassets.net/e5382hct74si/78Olo8EZRdUlcDUFQvnzG7/fa4cdb6dc04c40fceac194134788a0e2/1618983297-powered-by-vercel.svg)


## Default `db.json`

```json
{
  "companies": [
    { "id": 1, "logo": "company1_logo_url", "name": "Company 1", "status": "Active" },
    { "id": 2, "logo": "company2_logo_url", "name": "Company 2", "status": "Inactive" }
  ],
  "users": [
    { "id": 1, "username": "admin", "password": "admin123", "firstname": "Admin", "lastname": "User", "type": "Admin", "status": "Active" },
    { "id": 2, "username": "editor", "password": "editor123", "firstname": "Editor", "lastname": "User", "type": "Editor", "status": "Active" },
    { "id": 3, "username": "writer", "password": "writer123", "firstname": "Writer", "lastname": "User", "type": "Writer", "status": "Active" }
  ],
  "articles": [
    {
      "id": 1,
      "image": "https://img.freepik.com/free-vector/top-view-creative-workplace_1284-10109.jpg?w=900&t=st=1702028645~exp=1702029245~hmac=8d839bc15c062bee9f027615e947acbf728b5ed2533b06719d3151dc4142e90f",
      "title": "Article 1",
      "link": "article1_link_url",
      "date": "2023-12-08",
      "content": "Article 1 content",
      "status": "Published",
      "writer": "Christian",
      "editor": "Ian",
      "company": { "id": 1, "logo": "company1_logo_url", "name": "Company 1", "status": "Active" }
    },
    {
      "id": 2,
      "image": "https://img.freepik.com/free-vector/top-view-creative-workplace_1284-10109.jpg?w=900&t=st=1702028645~exp=1702029245~hmac=8d839bc15c062bee9f027615e947acbf728b5ed2533b06719d3151dc4142e90f",
      "title": "Article 2",
      "link": "article2_link_url",
      "date": "2023-12-08",
      "content": "Article 2 content",
      "status": "For Edit",
      "writer": "Kira",
      "editor": null,
      "company": { "id": 1, "logo": "company1_logo_url", "name": "Company 1", "status": "Active" }
    }
  ]
}

```
