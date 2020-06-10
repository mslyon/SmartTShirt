# StartfeldSmartTshirtService

## Automatic install

Run setup.sh from ~/StartfeldSmartTshirt/Service/

Enable I2C, see:
https://learn.adafruit.com/adafruits-raspberry-pi-lesson-4-gpio-setup/configuring-i2c

There is a possibility that touch sensor won't work, you need to add
`dtoverlay=i2c-bcm2708` to `/boot/config.txt` and reboot. See:
https://learn.adafruit.com/mpr121-capacitive-touch-sensor-on-raspberry-pi-and-beaglebone-black/software


## Manual install

Install the following packages:
* python3-smbus
* build-essential
* python3-dev
* scons
* python3-rpi.gpio

Then install the python requirements with sudo:
sudo pip3 install -r requirements.txt
sudo pip install -r requirements.txt

Enable I2C, see:
https://learn.adafruit.com/adafruits-raspberry-pi-lesson-4-gpio-setup/configuring-i2c

There is a possibility that touch sensor won't work, you need to add
`dtoverlay=i2c-bcm2708` to `/boot/config.txt` and reboot. See:
https://learn.adafruit.com/mpr121-capacitive-touch-sensor-on-raspberry-pi-and-beaglebone-black/software

Finally run the service with:
sudo python3 server.py

# Fixed server IP
To use a fixed server IP, add this to `config.ini`:

```
[fixed_host]
host = host_ip_here
port = host_port_here
```

Make sure that port to service is open.

# Manual install and configuration of Supervisor

    sudo apt-get install supervisor -y

Check if supervisor is running

    sudo systemctl status supervisor 

Create a configuration file for supervisor:

    sudo vim /etc/supervisor/conf.d/tshirtservice.conf

and add this:

    [program:tshirtservice]
    directory=/home/pi/StartfeldSmartTshirt/Service
    command=/bin/bash -E -c ./start.sh
    autostart=true
    autorestart=true
    stopsignal=INT
    stopasgroup=true
    killasgroup=true
    user=root

Check if our script is executable:

    chmod +x start.sh

Restart supervisor and check if our code is running:

    sudo systemctl restart supervisor.service
    sudo supervisorctl

# Testing

To test you need to install pytest and start the service before running the tests. Make sure
that no servers or standalone servers are running during testing! Then execute `py.test test_service`.
