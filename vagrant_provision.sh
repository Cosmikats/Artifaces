#!/bin/bash
REPO_PATH=/vagrant
PROJECT_NAME=htck

# Update
sudo apt-get update -y
sudo apt-get upgrade -y
# Install required packages
echo "Installing ruby and compass..."
sudo apt-get install git build-essential rubygems1.9 ruby-compass zip -y
sudo gem install compass
echo "Installing node and links..."
sudo wget https://nodejs.org/dist/latest-v12.x/node-v12.16.3-linux-x64.tar.xz -O /vagrant/node-v12.16.3-linux-x64.tar.xz
sudo tar xf /vagrant/node-v12.16.3-linux-x64.tar.xz -C /opt
sudo ln -sf /opt/node-v12.16.3-linux-x64/bin/node /usr/bin
sudo ln -sf /opt/node-v12.16.3-linux-x64/bin/npm /usr/bin
echo "Installing npm..."
sudo npm install -g npm
echo "Installing bower..."
sudo npm install -g bower
sudo ln -sf /opt/node-v12.16.3-linux-x64/bin/bower /usr/bin
echo "Installing grunt-cli..."
sudo npm install -g grunt-cli
sudo ln -sf /opt/node-v12.16.3-linux-x64/bin/grunt /usr/bin

su vagrant <<EOF
cd "$REPO_PATH"/"$PROJECT_NAME"
mkdir -p /home/vagrant/node_modules
rm -rf $REPO_PATH/$PROJECT_NAME/node_modules
ln -s /home/vagrant/node_modules $REPO_PATH/$PROJECT_NAME/node_modules
npm install
bower install
grunt serve
EOF
sudo ln -s /vagrant/deploy.sh /usr/bin/deploy
chmod 400 /home/vagrant/.ssh/id_rsa
