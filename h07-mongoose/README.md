# TdoT Backend

## Technical Overview

```plantuml

node "Node.Js" {
  interface HTTP
  [Express]
}

database "MongoDB" {
    [DB]
}

HTTP -right- [Express]
[Express] -right- DB
```

This backend is based on the following technologies:

-   MongoDB
-   Express
-   Node.js

## Getting started

### How to test

```shell
# initially needs a mongo instance for testing
# will be wiped at each test run
# note that we map this to port 50000
docker run -d --name mongo-test -p 50000:27017 mongo

# run as often as you want
# will drop database every time
npm test

# finally remove mongo container
docker rm -f mongo-test
```

### How to run

```shell
# again we need a mongo instance - we use a container again
# note that we map this time to default port 27017
docker create --name mongo-prod -p 27017:27017 mongo

# start the container
docker start mongo-prod

# fill database with demo data
npm run fill-demo-data

# start the service
npm start

docker stop mongo-prod
# if no longer needed, remove mongo container
# --> all data is lost
docker rm -f mongo-prod
```

## Data Model

```plantuml
class Tour {
  guideName: String
  guideClass: String
  numPersons: Number
  registration: Boolean
}

class Station {
  title: String
  subtitle: String
  roomNumber: Number
  interactive: Boolean
}

class School {
  code: Number
  title: String
  category: Category
}

class Address {
  zipCode: Number
  city: String
  address: String
}

enum Category {
  AHS
  BHS
  MS
}

class Voting {
  timestamp: Date
  numStars: Number
}

Tour "0..n" -down-> "0..1" Station : > favoriteStation
School *-down- "1" Address : > address
Tour "0..n" -right-> "0..1" School: > currSchool
Tour "0..n" -down- "0..n" Station

(Tour, Station) . Voting

```
