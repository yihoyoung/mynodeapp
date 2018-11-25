# maintainer lihaorong@163.com

set -e

OUTPUT_PATH='dist'

rm -rf $OUTPUT_PATH

# 编译
webpack

# 复制 web public 文件

cp -r public $OUTPUT_PATH/public
cp -r views $OUTPUT_PATH/views
cp package.json $OUTPUT_PATH/package.json
cp Dockerfile $OUTPUT_PATH/Dockerfile

cd $OUTPUT_PATH

docker build -t yihoyoung/myblog:v1.0 .
docker push yihoyoug/myblog:v1.0
