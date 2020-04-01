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
> Create new todo

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
  "error": "Title tidak boleh kosong & Description tidak boleh kosong"
}
```

_Response (500 - Internal Server Error)_
```
```

---
### GET /todos/:id
> Get todo by id

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
    "data": {
            "id": 3,
            "title": "makan",
            "description": "sahur",
            "status": false,
            "due_date": "2020-01-01",
            "createdAt": "2020-03-30T09:04:32.921Z",
            "updatedAt": "2020-03-30T09:44:14.027Z"
        }    
}
```

_Response (404 - Not Found)_
```
{
    "message": "data not found"
}
```

_Response (500 - Internal Server Error)_
```
```

---
### PUT /todos/:id
> edit todo by id

_Request Header_
```
{
  "Content-Type": application/json
}
```

_Request Body_
```
{
  "title": "Makan subuh",
  "description": "Sahur",
  "due_date": "2020-01-01",
  "status": false
}
```

_Response (200 - OK)_
```
{
    "data": {
        "id": 3,
        "title": "Makan subuh",
        "description": "Sahur",
        "status": false,
        "due_date": "2020-01-01",
        "createdAt": "2020-03-30T09:04:32.921Z",
        "updatedAt": "2020-03-30T10:29:12.417Z"
    }
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

_Response (400 - Bad Request)_
```
{
  "error": "Title tidak boleh kosong & Description tidak boleh kosong"
}
```

_Response (500 - Internal Server Error)_
```
```

---
### DELETE /todos/:id
> delete todo by id

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
    "data": {
        "id": 4,
        "title": "makan pagi",
        "description": "sarapan",
        "status": false,
        "due_date": "2021-05-10",
        "createdAt": "2020-03-30T09:54:06.503Z",
        "updatedAt": "2020-03-30T09:54:06.503Z"
    }
}
```

_Response (404 - Not Found)_
```
{
    "message": "data not found"
}
```

_Response (500 - Internal Server Error)_
```
```

