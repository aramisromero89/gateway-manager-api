## Description

 Gateway manager API written with [Nest](https://github.com/nestjs/nest). Deployed [here](https://gateway-manager-890703.herokuapp.com)


## Setup
You muset set these a postrgres database connection string(E.g postgresql://postgres:postgres@localhost:5432/gateway?schema=public) and the app port environment variables

```bash
$ export DATABASE_URL={DB_URL}
$ export PORT=80
```

## Installation

```bash
$ npm install
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

