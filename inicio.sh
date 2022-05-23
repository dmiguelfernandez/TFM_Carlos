#!/bin/bash


#download node and npm
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install nodejs

#create our working directory if it doesnt exist
DIR="/home/api"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  sudo mkdir ${DIR}
fi

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/api

#navigate into our working directory where we have all our github files
cd /home/api

#install node modules
sudo npm install

#start our node app in the background
sudo node prueba.js
