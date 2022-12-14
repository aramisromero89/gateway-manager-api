## Description

 Gateway manager API written with [Nest](https://github.com/nestjs/nest). Deployed [here](https://gateway-manager-890703.herokuapp.com).
 
 Any commits to master branch will update the service on Heroku until november when the free plan will be gone :( .

## Installation

```bash
$ npm install
```

## Setup
You have to set the following environment variables

```bash
# E.g postgresql://postgres:postgres@localhost:5432/gateway?schema=public
$ export DATABASE_URL={DB_URL}
$ export PORT=80
$ export JWT_SECRET=some-secret
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

