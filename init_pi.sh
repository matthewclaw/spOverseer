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
cd ..
echo "Attempting to install Teamviewer..."
echo "running update and upgrade..."
sudo apt-get -y update
sudo apt-get -y upgrade
echo "downloading deb"
wget https://download.teamviewer.com/download/linux/teamviewer-host_armhf.deb
echo "running dpkg install"
sudo dpkg -i teamviewer-host_armhf.deb
echo "running --fix-broken"
sudo apt --fix-broken - y install
echo "Please run:"
echo "sudo teamviewer passwd <password>"
echo "In order to set up the password for teamviewer"