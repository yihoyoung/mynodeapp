# run database
docker run -p 3306:3306 --name mysql -v $PWD/mysql/data:/var/lib/mysql -v $PWD/mysql/logs:/logs -e MYSQL_ROOT_PASSWORD=12345 -d mysql:5.6


# run app container
docker run -p 3000:3000 --name blog --link mysql:dbhost -d yihoyoung/myblog:v1.0