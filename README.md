SMMApp2
=======

Saint Mary's Mobile App, Version 2.0

# Screenshots
See [screenshots](/screenshots/).

# Documentation
See [documentation](/documentation/).

## History
SMMApp 1.0 can be found at [github.com/dreid93/smmapp](https://github.com/dreid93/smmapp). We [won](http://www.smu.ca/newsreleases/2013/may/team-smmapps-wins-saint-marys-first-ever-mobile-app-contest-.html) the first [Mobile App Contest at Saint Mary's University](http://www.smu.ca/academic/science/department/mobile-app-contest.html) and SMMApp2 is for the second contest.

## Features
Implemented features: https://github.com/Glavin001/SMMApp2/issues?labels=feature&state=closed

Future features: https://github.com/Glavin001/SMMApp2/issues?labels=feature&state=open

## Bugs
See https://github.com/Glavin001/SMMApp2/issues?labels=bug&state=open

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
To start the server app execute the following (default port 8080):
`npm start`
or
`node app.js`

In your web browser go to [http://localhost:8080/](http://localhost:8080/).
### Custom Port Number
To start the server app with a custom port number, such as `8081`, execute the following:
```bash
node app.js -p 8081
```
In your browser go to [http://localhost:8081/](http://localhost:8081/).

## Test / Benchmark
Start the server app.
In your web browser go to [http://localhost:8080/admin](http://localhost:8080/admin).
Then execute the following:
```bash
npm test
```
And follow the on screen instructions.
