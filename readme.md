## Requirements 
[deno](https://deno.com/) and [docker](https://www.docker.com/). If you don't have deno I suggest [dvm](https://github.com/justjavac/dvm), the same way I suggest nvm for managing for node. 

## How to deploy and run

docker compose up

A postgresql admin UI called Adminer (formerly phpMinAdmin) was added to the docker compose to make it convinient to query postgresql with no client requirements on the local machine, connect to http://localhost:8080

Server: db (the service name defined in your Docker Compose file).
Username: postgres (default superuser).
Password: alaffia (specified in the POSTGRES_PASSWORD environment variable).
Database: postgres (default database).

Run the the ddl to define the schema for the data, the dml to add the data. Both scripts are designed to be re-runnable in case the run fails or needs to be stoped for whatever reason, it also helps with develoment when you are constantly modifying the scripts.