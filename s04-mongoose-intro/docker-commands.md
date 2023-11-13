# Useful docker commands

## Run a mongo container on port 50000

`docker run -d --name mongo-intro -p 50000:27017 mongo`

## Log running containers

`docker ps`

## Log containers (all)

`docker ps -a`

## Stop container

`docker stop <container_id>`

## Remove container

`docker rm <container_id>`
