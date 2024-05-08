# Alaffia Technical Challenge

## Rationale

deno is created by the same creator as node, Ryan Dahl. In a nutshell deno is similar to node I like to think it as node + typescript + security by default - npm. Not having npm makes the project much cleaner and makes deployment much simpler


graphiql
A postgresql admin UI called Adminer (formerly phpMinAdmin) was added to the to make it convinient to query PostgreSQL with no client requirements on the local machine.


## Requirements 
[deno](https://deno.com/) and [docker](https://www.docker.com/). 

If you don't have deno I suggest [dvm](https://github.com/justjavac/dvm), the same way I suggest nvm for managing for node. 

## How to deploy and run

NOTE: .env was commited to make deployment simpler, normally it would be added to the .gitgnore

docker compose up

Adminer connect to http://localhost:8080

* Server: db (the service name defined in your Docker Compose file).
* Username: postgres (default superuser).
* Password: alaffia (specified in the POSTGRES_PASSWORD environment variable).
* Database: postgres (default database).

Run the the ddl to define the schema for the data, the dml to add the data. Both scripts are designed to be re-runnable in case the run fails or needs to be stoped for whatever reason, it also helps with develoment when you are constantly modifying the scripts.

The security flags are self explanatory --allow-net allows network access and --allow-env allows access to enviromental variables
deno run --allow-net --allow-env  --allow-read server.ts

## Test

The built in testing library Deno.test has an API that strongly resembles jest