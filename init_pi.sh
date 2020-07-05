echo "Cloning master"
git clone --single-branch --branch "master" https://github.com/matthewclaw/spOverseer.git
chmod ugo+wrx -R mjmOverseer
cd mjmOverseer
mkdir "drop_locations"
mkdir "Logs"
sudo apt-get update
echo "Installing Node.js"
sudo apt-get install -y nodejs
echo "Installing npm"
sudo apt-get install -y npm
echo "Installing Node Modules"
npm i