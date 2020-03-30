# fancy-to-do server
Ini adalah API untuk membuat todo list menggunakan Express js, Sequelize, dan Postgres

&nbsp;

## endpoints
### GET /todos

> Get all todos

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        {
            "id": 3,
            "title": "makan",
            "description": "sahur",
            "status": false,
            "due_date": "2020-01-01",
            "createdAt": "2020-03-30T09:04:32.921Z",
            "updatedAt": "2020-03-30T09:44:14.027Z"
        }
    ]
}
```

_Response (500 - Internal Server Error)_
```
```
---
### POST /todos

> Create new asset

_Request Header_
```
{
  "Content-Type": application/json
}
```

_Request Body_
```
{
  "title": "Makan",
  "description": "Sahur",
  "due_date": "2020-01-01"
}
```

_Response (201 - Created)_
```
{
    "data": {
        "id": 4,
        "title": "Makan",
        "description": "Sahur",
        "status": false,
        "due_date": "2020-01-01",
        "updatedAt": "2020-03-30T09:54:06.503Z",
        "createdAt": "2020-03-30T09:54:06.503Z"
    }
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Title tidak boleh kosong & Description tidak boleh kosong"
}
```

_Response (500 - Internal Server Error)_
```
```
