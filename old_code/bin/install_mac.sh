#!/bin/bash
echo "===== Installing dependencies for Mac ====="
echo

# MongoDB
command -v mongod >/dev/null 2>&1 || { 
	echo "I require foo but it's not installed. Aborting." >&2; exit 1; 
	echo "Please install MongoDB"
	echo "http://www.mongodb.org/downloads"
	echo
}

# Installing Redis
command -v redis-server >/dev/null 2>&1 || { 
	echo "Please install Redis"
	echo "http://redis.io/download"
	echo "For Mac, see http://jasdeep.ca/2012/05/installing-redis-on-mac-os-x/"
	echo
	read -p "Would you like to try the automated installation? " -n 1 -r
	echo    # (optional) move to a new line
	if [[ $REPLY =~ ^[Yy]$ ]]
	then
	# do dangerous stuff
		echo "Downloading Redis install ~/Downloads/redis-2.6.16"
		cd ~/Downloads/
		wget http://download.redis.io/releases/redis-2.6.16.tar.gz
		tar xzf redis-2.6.16.tar.gz
		cd redis-2.6.16
		echo "Building Redis"
		make
		echo "Installing Redis to /usr/bin"
		sudo mv src/redis-server /usr/bin
		sudo mv src/redis-cli /usr/bin
		echo "Creating Redis configuration in ~/.redis/"
		mkdir ~/.redis
		touch ~/.redis/redis.conf
		echo "To start Redis Server run the following:"
		echo "	redis-server"
		echo "And Redis Client"
		echo "	redis-cli"
		echo
	fi
}

echo 
echo "===== Completed installation of dependencies ====="