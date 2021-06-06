# Halomentor CRUD

## Features

### Frontend

- Create new mentor with image
- Display all mentor in page
- Update mentor
- Delete mentor

### Backend route
```
GET    /mentors
GET    /mentors?name=fiqri
GET    /mentors/1
POST   /mentors
PATCH  /mentors/1
DELETE /mentors/1
```
## Tech
- React js 
- Ant Design (Ui Framework)
- Node js 
- Express js
- Multer js (File upload)
- Mysql Database

## Installation

### backend

Setup Mysql Database
```
CREATE DATABASE halomentor;

use halomentor;

CREATE TABLE mentor (
id INT(11) AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255),
avatar VARCHAR(255),
role VARCHAR(255),
)
```


Clone this repo, and edit .env file for database cofiguration
```
cd backend
cp env.sample .env
npm install
node index.js
```

### Frontend

```sh
cd frontend
npm install
npm start
```
