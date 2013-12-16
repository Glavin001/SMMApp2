# Installation

## Requirements
#### - Git
See http://git-scm.com/book/en/Getting-Started-Installing-Git for installation.
It is very important to understand how to use Git. If you're not familar please learn more at http://try.github.io/
#### - Node.js
See http://nodejs.org/ for installation and more information.

### Operating System Support
Tested and supports Mac, Linux (Ubuntu tested), and Windows.

=====

## Installation of App Server
> See [Installation on Windows](#installation-on-windows) for using Windows to host server app.

Run the following [Terminal](http://en.wikipedia.org/wiki/Terminal_\(OS_X\)) command.
### 1) SSH
```bash
git clone git@github.com:Glavin001/SMMApp2.git && \ # Git Clone using SSH
cd SMMApp2 && \ # Change directory to SMMApp2
./bin/install.sh && \ # Install MongoDB and Redis
npm install # Install Node dependencies
```
#### Troubleshooting
If you receive the following error:
```bash
Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```
Then use method 2, `HTTP`, instead. 
Alternatively, you can setup SSH keys with GitHub and start using SSH! 
See GitHub's documentation on [Generating SSH Keys](https://help.github.com/articles/generating-ssh-keys).

### 2) HTTP
```bash
git clone https://github.com/Glavin001/SMMApp2.git && \ # Git Clone using HTTP
cd SMMApp2 && \ # Change directory to SMMApp2
./bin/install.sh && \ # Install MongoDB and Redis
npm install # Install Node dependencies
```

### Installation On Windows
First, [install MongoDB manually.](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
Install [Git for Windows](http://msysgit.github.io/).
Then open Git Bash and run the following Bash command:
```bash
git clone https://github.com/Glavin001/SMMApp2.git && \
cd SMMApp2 && \ # Change directory to SMMApp2
npm install # Install Node dependencies
```
For usage on running the app server on Windows, see [Running without Redis](#running-without-redis).

## Running App Server
To start the server app execute the following (default port 8080):
```bash
node app.js
```
In your browser go to [http://localhost:8080/](http://localhost:8080/).
### Custom Port Number
To start the server app with a custom port number, such as `8081`, execute the following:
```bash
node app.js -p 8081
```
In your browser go to [http://localhost:8081/](http://localhost:8081/).
### Running Without Redis
To start the server app without Redis, such as on when running on Windows, execute the following:
```bash
node app.js --disable-redis-store
```
In your browser go to [http://localhost:8080/](http://localhost:8080/).
