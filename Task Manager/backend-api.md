# TeamDev
### Пользователи (User):
|Entity         |Database       |Description    |
|---------------|---------------|---------------|
| id            |int(11)        |               |
| email         |varchar(255)   |               |
| password      |varchar(255)   |               |
| username      |varchar(255)   |               |


#### front:
- форма регистрации с полями:
    - email
    - password
    - username 
- форма входа с полями:
    - email
    - password
    - username
    - Remember me
#### back:
- получает JSON:
```
   POST /auth/signup
    {
        "email": "email",
        "password": "password",
        "username": "username"
    }

   POST /auth/login

    {
        "email": "email",
        "password": "password",
    }
```
- создает пользователя в БД (пароль хэширует)
- авторизует пользователя по email & password
- расширенный функционал:
    - подтвержедние email
    - ругистрация по соцсетям, github

### Проекты (Project):
|Entity                 |Database           |Description    |
|-----------------------|-------------------|---------------|
|id                     |int(11)            |               |
|автор (User)           |creator_id: int(11)|Связь с User по id|
|Название (name)        |varchar(50)        |               |
|описание (description) |varchar(255)       |               |
|команда (User[])       |team_id int(11)    |Список User, участвующих в проекте|
|срок (deadline: Date)  |datetime           |               |
|задачи (Task[])        |В задаче id проекта|Список Task, привязанных к проекту| 


### Команды (Teams):
- id: int(11)
- user_id: int(11)

#### front:
- форма создания проекта:
    - наименование
- окно проекта:
    - изменение названия и описания
    - получение списка задач проекта
    - добавление задач
    - получение состава команды
    - изменение состава команды
    - на каждое изменение отправляется JSON
#### back:
- создание проекта
```
   POST /projects/

    {
        "name": "name"
    }
```
- изменение данных проекта
```
    {
        "name": "name",
        "description": "description",
        "deadline": "deadline"
    }
```
- изменение команды
```
    {
        "project_id": id,
        "team": [
            {
                "id": id
                "email": "email",
                "username": "username"
            }
        ]
    }
```
- получение списка проектов:
```
   GET /projects/user_id
```

- получение данных проекта:
```
   GET /projects/project_id

    {
        "project_id": id,
        "name": "name",
        "description": "description",
        "deadline": "deadline",
        "team": [
            {
                "id": id
                "email": "email",
                "username": "username"
            }            
        ],
        "tasks": [
            {
                "id": id
                "status": "status",
                "name": "name",
                "description": "description",
                "creator": creator_id,
                "responsible": responsible_id,
            }            
            
        ]
    }
```

### Задача (Task):
|Entity                 |Database           |Description    |
|-----------------------|-------------------|---------------|
|id                     |int(11)            |               |
|статус (status)        |int(11)            | - либо фиксированные,              |
|                       |                   | - либо варианты статусов 
|                       |                   | задаются пользователем|
|                       |                   | - в разрезе проектов|
|                       |                   | или общие для пользователя|
|автор (User)           |creator_id: int(11)|Связь с User по id|
|Название (name)        |varchar(50)        |               |
|описание (description) |varchar(255)       |               |
|исполнитель (User)     |responsible_id: int(11)|           |
 
#### back:
- создание задачи
```
    POST /tasks/

   {
        "project_id": id,
        "name": "name"
    }
```

