
#!/bin/bash


#download node and npm
npm install -g npm
npm install -g node

#create our working directory if it doesnt exist
DIR="/home/ec2-user/api"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/api

#navigate into our working directory where we have all our github files
cd /home/ec2-user/api

#install node modules
npm install

#start our node app in the background
node prueba.js
