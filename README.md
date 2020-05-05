## Description

Test project - NestJS, Angular 9, MongoDB

## Running the app

```bash
$ docker-compose up --build
```

## Restore mongo data

```bash
$ docker-compose exec -T nest-mongodb mongorestore --archive --gzip < dump.gz
```
