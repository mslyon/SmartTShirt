sudo apt-get update
sudo apt-get install libtiff5 libopenjp2-7 python3-smbus python3-venv build-essential python3-dev scons supervisor virtualenvwrapper -y

python3 -m venv StartfeldSmartTshirtServer
. StartfeldSmartTshirtServer/bin/activate

pip install -r requirements.txt

cp src/StartfeldSmartTshirtServer/settings/local.sample.env src/StartfeldSmartTshirtServer/settings/local.env 

cd src
python manage.py migrate

cd ..

echo "user=$USER" >> tshirtserver.conf
sudo cp tshirtserver.conf /etc/supervisor/conf.d/tshirtserver.conf
sudo systemctl restart supervisor.service
echo "Setup complete!"
