docker swarm leave --force

./docker.sh

docker swarm init

docker stack deploy -c docker-compose.yaml myapp