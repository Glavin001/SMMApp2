UniAPI and UniCal [![Build Status](https://magnum.travis-ci.com/Glavin001/SMMApp2.png?token=sBRh3JkKuJ1pZKWysrwe&branch=glavin)](https://magnum.travis-ci.com/Glavin001/SMMApp2)
=======

> Saint Mary's Mobile App

![](screenshots/uni-cal.png)

## Installation

### Global Dependencies

#### Node.js and NPM

See http://nodejs.org/

##### Bower

See http://bower.io/

#### Dependencies

```bash
npm install
bower install
```

## Usage

### Run UniAPI Server

```bash
node api-server/
```

### Run UniCal Server

```bash
node unical-server/
```

### Load Courses from file

```bash
node utils/load_courses.js -i data/courses.csv
```

### Create Sandbox

Creating a sandbox (fake data) with 10 users.

```bash
node ./utils/sandbox.js --users 10
```

## Screenshots
See [/screenshots/README.md](/screenshots/).

## Documentation
See [/docs/README.md](/docs/).

### Installation
See [/docs/installation.md](/docs/installation.md).

## Features
Implemented features: https://github.com/Glavin001/SMMApp2/issues?labels=feature&state=closed

Future features: https://github.com/Glavin001/SMMApp2/issues?labels=feature&state=open

## Bugs
See all known open bugs at https://github.com/Glavin001/SMMApp2/issues?labels=bug&state=open

If you find more bugs, please create a new Issue and mark it with the `bug` label.
