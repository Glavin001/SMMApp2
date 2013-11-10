# For Developers

## Requirements
#### - Git
See http://git-scm.com/book/en/Getting-Started-Installing-Git for installation.
It is very important to understand how to use Git. If you're not familar please learn more at http://try.github.io/
#### - Node.js
See http://nodejs.org/ for installation and more information.

## Installation of App Server
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

## Running App Server
To start the server app execute the following:
```bash
node app.js
```
### Custom Port Number
To start the server app with a custom port number, such as `8081`, execute the following:
```bash
node app.js -p 8081
```

-----
### [Next page: Developing a Page](develop_page.md)
