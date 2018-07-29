# Blog APP

## build image
```
#./docker.sh
```
## Run in docker stack 
```
#./run.sh
```
## Run in kubenetes - minicube
```
#kubenetes apply -f deployment.yaml
```
get service url:
```
minikube service my-service --url
```
visit service
```
curl ${service_url}
```