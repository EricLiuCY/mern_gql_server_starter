# Eatego's Cloud Backend

## Setup

* yarn init
* yarn add express
* yarn add typescript
* yarn add ts-node nodemon -D

## Eslinter guide

* yarn add eslint --dev
* yarn run eslint --init

## Dev Dependency

* yarn add eslint --dev
* yarn add prettier --dev --exact

## Local MongoDB

* Install MongoDB Binaries from their website
* Make a /data/db folder in a location where your user has read/write access
* Start Mongo db by running `sudo mongod --dbpath=/Users/ericliu/data/db`; where you specific the path in the `--dbpath flag`
* Then you can connec to db by running `sudo mongo`
* Once connected, switch to admin database by `user admin`
* then, create local user `
db.createUser(
  {
    user: "local",
    pwd: "q1w2e3",
    roles: [ "root" ]
  }
)`
