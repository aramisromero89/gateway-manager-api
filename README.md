## Description

 Gateway manager API written with [Nest](https://github.com/nestjs/nest). Deployed [here](https://gateway-manager-890703.herokuapp.com).


## Installation

```bash
$ npm install
```

## Setup
You have to set the postrgres database connection string and the app port environment variables

```bash
# E.g postgresql://postgres:postgres@localhost:5432/gateway?schema=public
$ export DATABASE_URL={DB_URL}
$ export PORT=80
```

Then you have to publish you schema

```bash
$ npx prisma db push
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

There are 2 tests for a proof of concept

```bash
# unit tests
$ npm run test
```

