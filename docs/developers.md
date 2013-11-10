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

----
# Create Your Own Development Branch
To make sure that your changes do not break the `master` branch you will create your own branch and push it to remote (Github). 
Only merge your code into the `master` branch if you are absolutely confident and confortable doing so.
If *anything* below is unfamiliar to you please go to http://try.github.io/ and learn more about how Git works and how to use it.

Run the following Terminal commands:
```bash
git branch
```
You should see:
```bash
* master
```
Notice the `*` by the `master` branch, meaning you are curring checking out the `master branch`.
You need to add your own branch:
```bash
git branch yourname
```
You should now have your own branch. Test this by again running `git branch` and you should now see
```bash
  yourname
* master
```
You need to checkout that branch.
```bash
git checkout yourname
```
Now try `git branch` and if successful you should see the `*` by `yourname`:
```bash
* yourname
  master
```
You're done! Always make sure you are on your own branch with `git checkout yourname` before making changes and when pushing to remote.

## Pulling (Updating) from Remote (Github)
By default this should work:
```bash
git pull
``` 
or to pull code from remote's branch named `branchName`:
```bash
git pull origin branchName
```
For example, to pull `Glavin`'s branch:
```bash
git pull origin glavin
```
Or to pull the latest `master` branch code:
```bash
git pull origin master
```

## Pushing (Saving) your code to Remote (Github)
### 1) Adding your code to your staging area
```bash
git add pathToFile
```
or to add all files
```bash
git add --all
```
### 2) Committing your staging area to your local branch
```bash
git commit -m "This is your commit message. Please put valuable and informative information here."
```
### 3) Finally, Pushing to Remote (Github)
```bash
git push
```
or 
```bash
git push origin yourname
``` 

-----

[Post any questions on the Issues page.](https://github.com/Glavin001/SMMApp2/issues?labels=question)

-----
### [Next page: Developing a Page](develop_page.md)
