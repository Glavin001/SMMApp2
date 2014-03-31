#!/bin/bash
echo "===== Installing dependencies for Linux ====="
echo

# MongoDB
command -v mongod >/dev/null 2>&1 || { 
	echo "Please install MongoDB"
	echo "http://www.mongodb.org/downloads"
	echo
}

# Installing Redis
command -v redis-server >/dev/null 2>&1 || { 
	echo "Please install Redis"
	echo "http://redis.io/download"
	echo "For Ubuntu, see https://library.linode.com/databases/redis/ubuntu-12.04-precise-pangolin"
	echo
	read -p "Would you like to try the automated installation? " -n 1 -r
	echo    # (optional) move to a new line
	if [[ $REPLY =~ ^[Yy]$ ]]
	then
		# do dangerous stuff
		echo "Installing Redis with "
		echo "	sudo apt-get install redis-server"
		sudo apt-get install redis-server
		echo
		echo "Restarting redis-server"
		sudo service redis-server restart
	fi
}

echo 
echo "===== Completed installation of dependencies ====="