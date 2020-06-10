#!/bin/bash
# Script to change FIX server's IP address

ask() {

    local prompt default REPLY
    while true; do
        if [ "${2:-}" = "Y" ]; then
            prompt="Y/n"
            default=Y
        elif [ "${2:-}" = "N" ]; then
            prompt="y/N"
            default=N
        else
            prompt="y/n"
            default=
        fi
        # Ask the question (not using "read -p" as it uses stderr not stdout)
        echo -n "$1 [$prompt] "
        # Read the answer (use /dev/tty in case stdin is redirected from somewhere else)
        read REPLY </dev/tty

        # Default?
        if [ -z "$REPLY" ]; then
            REPLY=$default
        fi


        # Check if the reply is valid

        case "$REPLY" in
            Y*|y*) return 0 ;;
            N*|n*) return 1 ;;
        esac
    done
}
count=$(cat config.ini | sed -n "/fixed/p" | wc -l)
if [ "$count" == "1" ]; then
	if ask "You already have configred an IP address. Do you want configure a new fixed server IP?:"; then

    		echo "Enter remote IP address of your server (eg. 192.168.100.20)"
    		read REPLY </dev/tty
    		echo "Please make sure to allows access to the port 8080 on your server"
		sed -i "/host =/c\host = $REPLY" config.ini

	else
    		echo "Your network with be enabled with Zeroconf network discovery..."

	fi
else
	if ask "Do you want configure fixed server IP:"; then
    		echo "Enter remote IP address of your server (eg. 192.168.100.20)"
    		read REPLY </dev/tty
    		echo "Please make sure to allows access to the port 8080 on your server"
		echo "" >> config.ini
    		echo "[fixed_host]" >> config.ini
    		echo "host = $REPLY" >> config.ini
    		echo "port = 8080" >> config.ini
	else
    		echo "Your network with be enabled with Zeroconf network discovery..."

	fi
fi

