
# build docker image file
sudo docker build --rm -t myapp:alpine .

# run docker container
# sudo docker run -p 3000:3000 myapp:alpine -d

# stop container
# sudo docker stop [container-id]

# into the container
# sudo docker exec -it [container-id] /bin/sh

# rm container
# sudo docker rm $(sudo docker ps -a -q)

# rm <none> image
# old version
# sudo docker rmi $(sudo docker images | grep “^” | awk “{print $3}”)
# new version
sudo docker rmi $(sudo docker images -f 'dangling=true' -q)