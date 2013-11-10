
## Installation
Run the following Terminal command.
### 1) SSH
```bash
git clone git@github.com:Glavin001/SMMApp2.git && cd SMMApp2 && npm install
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
### 2) HTTP
```bash
git clone https://github.com/Glavin001/SMMApp2.git && cd SMMApp2 && npm install
```
## Run
To start the server app execute the following:
```bash
node app.js
```
### Custom Port Number
To start the server app with a custom port number, such as `8081`, execute the following:
```bash
node app.js -p 8081
```
