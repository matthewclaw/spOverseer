cd ~/
echo "Cloning 'master'"
git clone --single-branch --branch "master" https://github.com/matthewclaw/mjmOverseer.git
echo "Enabling NodeSource"
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
echo "Installing Node.js"
sudo apt install -y nodejs
echo "Installing npm"
sudo apt-get install -y npm
cd mjmOverseer
echo "Installing Node Modules"
npm i