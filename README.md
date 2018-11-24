# Blog APP
### run database
```
./run_mysql.sh
```

### create datebase
```
CREATE SCHEMA `blog` DEFAULT CHARACTER SET utf8 ;
```

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