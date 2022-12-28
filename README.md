### Description

Bookstore web or something I don't know exactly

### Before you start

Create your `.env` file by making according change to `.your-env` file in server folder

### Quick start

## Manual

Go to server folder and run

```console
$ npm install
```

And then run the server by 

```console 
$ npm run start:dev
```

Likewise go to client folder and run

```console
$ npm install
```

And then run the client by 

```console 
$ npm run start
```

## Docker Compose

When done cloning, go to `book-store` folder and then run

``` console
$ cd ./manifest
$ docker-compose up
```

Or sometime at the future there will be a docker-hub image to be pulled

Both client and server will run at `localhost`  

- Client port: `3000`
- Server port: `3001`

### Login

You can create your account if you want. Or login with this account  
|-------------+----------+-------|
| username    | password | role  |
|-------------+----------+-------|
| admin       |   123456 | admin |
| hitsuji0501 |   123456 | user  |
|-------------+----------+-------|
