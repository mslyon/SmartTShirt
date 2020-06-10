

# StartfeldSmartTshirtServer

StartfeldSmartTshirtServer is built with [Python][3] using the [Django Web Framework][1].


## Installation

### Automatic install

Run 'setup.sh' from StartfeldSmartTshirt/Server

### Docker install

Install Docker and Docker Compose.
See: https://docs.docker.com/install/linux/docker-ce/ubuntu/

Run from StartfeldSmartTshirt/Server 

    docker-compose run web python src/manage.py migrate
    docker-compose run web python src/manage.py createsuperuser
    docker-compose build
    docker-compose up

### Manual install

First install the following packages: libtiff5 libopenjp2-7 python3-smbus python3-venv build-essential python3-dev scons supervisor virtualenvwrapper.

To set up a development environment quickly, first install Python 3. It
comes with virtualenv built-in. So create a virtual env by:

    1. `$ python3 -m venv StartfeldSmartTshirtServer`
    2. `$ . StartfeldSmartTshirtServer/bin/activate`

Install all dependencies:

    pip install -r requirements.txt

Rename 'local.sample.env' to 'local.env' in the src/StartfeldSmartTshirtServer/settings folder

Run migrations:

    python manage.py migrate

Create a superuser account:

    python manage.py createsuperuser


Start server:

    Check if you need to open port 8080/tcp so Django can serve beyond localhost.

    python manage.py runserver 0.0.0.0:8080 --noreload

In case you're having problems with the install and venv configuration, you can try this:


### Install and configure Supervisor

    sudo apt-get install supervisor -y

Check if supervisor is running

    sudo systemctl status supervisor 

Create a configuration file for supervisor:

    sudo vim /etc/supervisor/conf.d/tshirtserver.conf

and add this:

    [program:tshirtserver]
    directory=/home/current_user/StartfeldSmartTshirt/Server/src
    command=/bin/bash -E -c ./start.sh
    autostart=true
    autorestart=true
    stopsignal=INT
    stopasgroup=true
    killasgroup=true
    user=current_user

Check if our script is executable:

    chmod +x start.sh

Restart supervisor and check if our code is running:

    sudo systemctl restart supervisor.service
    sudo supervisorctl


### Standalone setup

This is a setup for Raspberry Pi server.

    1.  Install dependencies: sudo pip3 install -r requirements.txt
    2.  Run the service and shut it down after a while to generate a config.ini file.
    3.  Copy the value of UUID into the clipboard.
    4.  Run on the server: python3 manage.py migrate
    5.  Run python3 setup_standalone_mode.py with UUID from the clipboard as an argument. E.g. python3 setup_standalone_mode.py SOME-UUID-HERE
    6.  Run export NO_ZEROCONF=1
    7.  Start the server: python3 manage.py runserver 0.0.0.0:8080 --noreload
    8.  Login with email: local@local.com and password: 12345

### Detailed instructions

Take a look at the docs for more information.

[0]: https://www.python.org/
[1]: https://www.djangoproject.com/
