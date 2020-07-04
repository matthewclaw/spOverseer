echo "Cloning master"
git clone --single-branch --branch "master" https://github.com/matthewclaw/mjmOverseer.git
chmod ugo-wrx -R mjmOverseer
cd mjmOverseer
sudo apt-get update
echo "Installing Node.js"
sudo apt-get install -y nodejs
echo "Installing npm"
sudo apt-get install -y npm
echo "Installing Node Modules"
npm i