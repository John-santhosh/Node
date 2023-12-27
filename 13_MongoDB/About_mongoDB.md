# About DATABASE.

## about SQL

- traditional databases are built in are built in a relational structure.
- Related table reference each other with joints as data is queried.
- this relational tables also normalize the data (i.e) the data is not duplicated(thats the D.R.Y principle)

## about MongoDb

- using MongoDb we can throw all of that outside.
- it stores the data in collection.
- the individual records in the collections are called `document`
- these `document` have key value structure that looks like json
- collection holds all of the data about a user for eg, instead of breaking it into related tables
- duplicated and distributing the data where deemed necessary in a nosql structure is permitted.

## Advantages of MongoDB.

- performance(the speed which the collection is queried is very fast)
- flexibility(it's very easy to make structural changes like adding a new field without wreaking havoc in total structure, it is much like adding a new property into an object)
- scalability(Nosql can support large database with high request rates at very low latency)
- usability(we can get up and running with mongodb in cloud very fast)
