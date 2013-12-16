# For Developers

## Requirements
#### - Git
See http://git-scm.com/book/en/Getting-Started-Installing-Git for installation.
It is very important to understand how to use Git. If you're not familar please learn more at http://try.github.io/
#### - Node.js
See http://nodejs.org/ for installation and more information.

## Installation of App Server
> See [Installation on Windows](#installation-on-windows) for using Windows to host server app.

Run the following Terminal command.
### 1) SSH
```bash
git clone git@github.com:Glavin001/SMMApp2.git && \
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
### 2) HTTP
```bash
git clone https://github.com/Glavin001/SMMApp2.git && \
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
### Running in Windows / Without Redis
To start the server app without Redis, such as on when running on Windows, execute the following:
```bash
node app.js --disable-redis-store
```
In your browser go to [http://localhost:8080/](http://localhost:8080/).

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
*Note that it is acceptable to note have all of your files in your staging area.*
Only add the files that you have tested and are confident that you want to commit to your staging area.
```bash
git add pathToFile
```
or to add all files
```bash
git add --all
```
### 2) Verifying your staging area
You have now added files to your staging area. To check the status of your staging area run the following:
```bash
git status
```
If you have no changes you will see:
```bash
# On branch yourname
nothing to commit, working directory clean
```
If you have untracked files you will see the following. If so, see #1 "Adding your code to your staging area". 
```bash
# On branch yourname
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#	pathToFile1
#	pathToFile2
nothing added to commit but untracked files present (use "git add" to track)
```
If you have files that have been changed, but not staged to be commited:
```bash
# On branch yourname
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#	modified:   pathToFile1
#	modified:   pathToFile2
#
```
If you have successfully added your files to your staging area you will see:
```bash
# On branch yourname
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#	modified:   pathToFile1
#
```

### 3) Committing your staging area to your local branch
```bash
git commit -m "This is your commit message. Please put valuable and informative information here."
```
### 4) Finally, Pushing to Remote (Github)
```bash
git push
```
or 
```bash
git push origin yourname
``` 
Success will look similar to:
```bash
Counting objects: 49, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (32/32), done.
Writing objects: 100% (32/32), 101.31 KiB | 0 bytes/s, done.
Total 32 (delta 11), reused 0 (delta 0)
To git@github.com:Glavin001/SMMApp2.git
   1c3a8f3..0267e0a  yourname -> yourname
```
-----

#### [Post any questions on the Issues page.](https://github.com/Glavin001/SMMApp2/issues?labels=question)

-----
### [Next page: Developing a Page](develop_page.md)
