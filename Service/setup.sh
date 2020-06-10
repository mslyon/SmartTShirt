sudo apt-get update
sudo apt-get install libtiff5 libopenjp2-7 python3-smbus python3-venv build-essential xrdp python3-rpi.gpio python3-dev scons supervisor virtualenvwrapper python-pip python3-pip -y

sudo pip install -r requirements.txt
sudo pip3 install -r requirements.txt

sudo cp tshirtservice.conf /etc/supervisor/conf.d/tshirtservice.conf
sudo systemctl restart supervisor.service
echo "Setup complete!"
