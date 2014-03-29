
var index = lunr(function () {
    this.field('body');
    this.ref('url');
});

var documentTitles = {};



documentTitles["installation.html#installation"] = "Installation";
index.add({
    url: "installation.html#installation",
    title: "Installation",
    body: "# Installation  "
});

documentTitles["installation.html#requirements"] = "Requirements";
index.add({
    url: "installation.html#requirements",
    title: "Requirements",
    body: "## Requirements "
});

documentTitles["installation.html#git"] = "- Git";
index.add({
    url: "installation.html#git",
    title: "- Git",
    body: "#### - Git See http://git-scm.com/book/en/Getting-Started-Installing-Git for installation. It is very important to understand how to use Git. If you're not familar please learn more at http://try.github.io/ "
});

documentTitles["installation.html#nodejs"] = "- Node.js";
index.add({
    url: "installation.html#nodejs",
    title: "- Node.js",
    body: "#### - Node.js See http://nodejs.org/ for installation and more information.  "
});

documentTitles["installation.html#operating-system-support"] = "Operating System Support";
index.add({
    url: "installation.html#operating-system-support",
    title: "Operating System Support",
    body: "### Operating System Support Tested and supports Mac, Linux (Ubuntu tested), and Windows.  =====  "
});

documentTitles["installation.html#installation-of-app-server"] = "Installation of App Server";
index.add({
    url: "installation.html#installation-of-app-server",
    title: "Installation of App Server",
    body: "## Installation of App Server &gt; See [Installation on Windows](#installation-on-windows) for using Windows to host server app.  Run the following [Terminal](http://en.wikipedia.org/wiki/Terminal_\(OS_X\)) command. "
});

documentTitles["installation.html#1-ssh"] = "1) SSH";
index.add({
    url: "installation.html#1-ssh",
    title: "1) SSH",
    body: "### 1) SSH ```bash git clone git@github.com:Glavin001/SMMApp2.git &amp;&amp; \ # Git Clone using SSH cd SMMApp2 &amp;&amp; \ # Change directory to SMMApp2 ./bin/install.sh &amp;&amp; \ # Install MongoDB and Redis npm install # Install Node dependencies ``` "
});

documentTitles["installation.html#troubleshooting"] = "Troubleshooting";
index.add({
    url: "installation.html#troubleshooting",
    title: "Troubleshooting",
    body: "#### Troubleshooting If you receive the following error: ```bash Permission denied (publickey). fatal: Could not read from remote repository.  Please make sure you have the correct access rights and the repository exists. ``` Then use method 2, `HTTP`, instead.  Alternatively, you can setup SSH keys with GitHub and start using SSH!  See GitHub's documentation on [Generating SSH Keys](https://help.github.com/articles/generating-ssh-keys).  "
});

documentTitles["installation.html#2-http"] = "2) HTTP";
index.add({
    url: "installation.html#2-http",
    title: "2) HTTP",
    body: "### 2) HTTP ```bash git clone https://github.com/Glavin001/SMMApp2.git &amp;&amp; \ # Git Clone using HTTP cd SMMApp2 &amp;&amp; \ # Change directory to SMMApp2 ./bin/install.sh &amp;&amp; \ # Install MongoDB and Redis npm install # Install Node dependencies ```  "
});

documentTitles["installation.html#installation-on-windows"] = "Installation On Windows";
index.add({
    url: "installation.html#installation-on-windows",
    title: "Installation On Windows",
    body: "### Installation On Windows First, [install MongoDB manually.](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/) Install [Git for Windows](http://msysgit.github.io/). Then open Git Bash and run the following Bash command: ```bash git clone https://github.com/Glavin001/SMMApp2.git &amp;&amp; \ cd SMMApp2 &amp;&amp; \ # Change directory to SMMApp2 npm install # Install Node dependencies ``` For usage on running the app server on Windows, see [Running without Redis](#running-without-redis).  "
});

documentTitles["installation.html#running-app-server"] = "Running App Server";
index.add({
    url: "installation.html#running-app-server",
    title: "Running App Server",
    body: "## Running App Server To start the server app execute the following (default port 8080): ```bash node app.js ``` In your browser go to [http://localhost:8080/](http://localhost:8080/). "
});

documentTitles["installation.html#custom-port-number"] = "Custom Port Number";
index.add({
    url: "installation.html#custom-port-number",
    title: "Custom Port Number",
    body: "### Custom Port Number To start the server app with a custom port number, such as `8081`, execute the following: ```bash node app.js -p 8081 ``` In your browser go to [http://localhost:8081/](http://localhost:8081/). "
});

documentTitles["installation.html#running-without-redis"] = "Running Without Redis";
index.add({
    url: "installation.html#running-without-redis",
    title: "Running Without Redis",
    body: "### Running Without Redis To start the server app without Redis, such as on when running on Windows, execute the following: ```bash node app.js --disable-redis-store ``` In your browser go to [http://localhost:8080/](http://localhost:8080/). "
});



documentTitles["developers.html#for-developers"] = "For Developers";
index.add({
    url: "developers.html#for-developers",
    title: "For Developers",
    body: "# For Developers  First see the [Installation documentation](installation.md).  ---- "
});

documentTitles["developers.html#create-your-own-development-branch"] = "Create Your Own Development Branch";
index.add({
    url: "developers.html#create-your-own-development-branch",
    title: "Create Your Own Development Branch",
    body: "# Create Your Own Development Branch To make sure that your changes do not break the `master` branch you will create your own branch and push it to remote (Github).  Only merge your code into the `master` branch if you are absolutely confident and confortable doing so. If *anything* below is unfamiliar to you please go to http://try.github.io/ and learn more about how Git works and how to use it.  Run the following Terminal commands: ```bash git branch ``` You should see: ```bash * master ``` Notice the `*` by the `master` branch, meaning you are curring checking out the `master branch`. You need to add your own branch: ```bash git branch yourname ``` You should now have your own branch. Test this by again running `git branch` and you should now see ```bash   yourname * master ``` You need to checkout that branch. ```bash git checkout yourname ``` Now try `git branch` and if successful you should see the `*` by `yourname`: ```bash * yourname   master ``` You're done! Always make sure you are on your own branch with `git checkout yourname` before making changes and when pushing to remote.  "
});

documentTitles["developers.html#pulling-updating-from-remote-github"] = "Pulling (Updating) from Remote (Github)";
index.add({
    url: "developers.html#pulling-updating-from-remote-github",
    title: "Pulling (Updating) from Remote (Github)",
    body: "## Pulling (Updating) from Remote (Github) By default this should work: ```bash git pull ```  or to pull code from remote's branch named `branchName`: ```bash git pull origin branchName ``` For example, to pull `Glavin`'s branch: ```bash git pull origin glavin ``` Or to pull the latest `master` branch code: ```bash git pull origin master ```  "
});

documentTitles["developers.html#pushing-saving-your-code-to-remote-github"] = "Pushing (Saving) your code to Remote (Github)";
index.add({
    url: "developers.html#pushing-saving-your-code-to-remote-github",
    title: "Pushing (Saving) your code to Remote (Github)",
    body: "## Pushing (Saving) your code to Remote (Github) "
});

documentTitles["developers.html#1-adding-your-code-to-your-staging-area"] = "1) Adding your code to your staging area";
index.add({
    url: "developers.html#1-adding-your-code-to-your-staging-area",
    title: "1) Adding your code to your staging area",
    body: "### 1) Adding your code to your staging area *Note that it is acceptable to note have all of your files in your staging area.* Only add the files that you have tested and are confident that you want to commit to your staging area. ```bash git add pathToFile ``` or to add all files ```bash git add --all ``` "
});

documentTitles["developers.html#2-verifying-your-staging-area"] = "2) Verifying your staging area";
index.add({
    url: "developers.html#2-verifying-your-staging-area",
    title: "2) Verifying your staging area",
    body: "### 2) Verifying your staging area You have now added files to your staging area. To check the status of your staging area run the following: ```bash git status ``` If you have no changes you will see: ```bash "
});

documentTitles["developers.html#on-branch-yourname"] = "On branch yourname";
index.add({
    url: "developers.html#on-branch-yourname",
    title: "On branch yourname",
    body: ""
});

documentTitles["developers.html#on-branch-yourname"] = "On branch yourname";
index.add({
    url: "developers.html#on-branch-yourname",
    title: "On branch yourname",
    body: "# On branch yourname nothing to commit, working directory clean ``` If you have untracked files you will see the following. If so, see #1 \&quot;Adding your code to your staging area\&quot;.  ```bash # On branch yourname "
});

documentTitles["developers.html#untracked-files"] = "Untracked files:";
index.add({
    url: "developers.html#untracked-files",
    title: "Untracked files:",
    body: "# Untracked files: "
});

documentTitles["developers.html#use-git-add-file-to-include-in-what-will-be-committed"] = "(use \&quot;git add &lt;file&gt;...\&quot; to include in what will be committed)";
index.add({
    url: "developers.html#use-git-add-file-to-include-in-what-will-be-committed",
    title: "(use \&quot;git add &lt;file&gt;...\&quot; to include in what will be committed)",
    body: "#   (use \&quot;git add &lt;file&gt;...\&quot; to include in what will be committed) # #	pathToFile1 #	pathToFile2 nothing added to commit but untracked files present (use \&quot;git add\&quot; to track) ``` If you have files that have been changed, but not staged to be commited: ```bash "
});

documentTitles["developers.html#on-branch-yourname"] = "On branch yourname";
index.add({
    url: "developers.html#on-branch-yourname",
    title: "On branch yourname",
    body: "# On branch yourname "
});

documentTitles["developers.html#changes-not-staged-for-commit"] = "Changes not staged for commit:";
index.add({
    url: "developers.html#changes-not-staged-for-commit",
    title: "Changes not staged for commit:",
    body: "# Changes not staged for commit: "
});

documentTitles["developers.html#use-git-add-file-to-update-what-will-be-committed"] = "(use \&quot;git add &lt;file&gt;...\&quot; to update what will be committed)";
index.add({
    url: "developers.html#use-git-add-file-to-update-what-will-be-committed",
    title: "(use \&quot;git add &lt;file&gt;...\&quot; to update what will be committed)",
    body: "#   (use \&quot;git add &lt;file&gt;...\&quot; to update what will be committed) "
});

documentTitles["developers.html#use-git-checkout-file-to-discard-changes-in-working-directory"] = "(use \&quot;git checkout -- &lt;file&gt;...\&quot; to discard changes in working directory)";
index.add({
    url: "developers.html#use-git-checkout-file-to-discard-changes-in-working-directory",
    title: "(use \&quot;git checkout -- &lt;file&gt;...\&quot; to discard changes in working directory)",
    body: "#   (use \&quot;git checkout -- &lt;file&gt;...\&quot; to discard changes in working directory) # #	modified:   pathToFile1 #	modified:   pathToFile2 # ``` If you have successfully added your files to your staging area you will see: ```bash "
});

documentTitles["developers.html#on-branch-yourname"] = "On branch yourname";
index.add({
    url: "developers.html#on-branch-yourname",
    title: "On branch yourname",
    body: "# On branch yourname "
});

documentTitles["developers.html#changes-to-be-committed"] = "Changes to be committed:";
index.add({
    url: "developers.html#changes-to-be-committed",
    title: "Changes to be committed:",
    body: "# Changes to be committed: "
});

documentTitles["developers.html#use-git-reset-head-file-to-unstage"] = "(use \&quot;git reset HEAD &lt;file&gt;...\&quot; to unstage)";
index.add({
    url: "developers.html#use-git-reset-head-file-to-unstage",
    title: "(use \&quot;git reset HEAD &lt;file&gt;...\&quot; to unstage)",
    body: "#   (use \&quot;git reset HEAD &lt;file&gt;...\&quot; to unstage) # #	modified:   pathToFile1 # ```  "
});

documentTitles["developers.html#3-committing-your-staging-area-to-your-local-branch"] = "3) Committing your staging area to your local branch";
index.add({
    url: "developers.html#3-committing-your-staging-area-to-your-local-branch",
    title: "3) Committing your staging area to your local branch",
    body: "### 3) Committing your staging area to your local branch ```bash git commit -m \&quot;This is your commit message. Please put valuable and informative information here.\&quot; ``` "
});

documentTitles["developers.html#4-finally-pushing-to-remote-github"] = "4) Finally, Pushing to Remote (Github)";
index.add({
    url: "developers.html#4-finally-pushing-to-remote-github",
    title: "4) Finally, Pushing to Remote (Github)",
    body: "### 4) Finally, Pushing to Remote (Github) ```bash git push ``` or  ```bash git push origin yourname ```  Success will look similar to: ```bash Counting objects: 49, done. Delta compression using up to 8 threads. Compressing objects: 100% (32/32), done. Writing objects: 100% (32/32), 101.31 KiB | 0 bytes/s, done. Total 32 (delta 11), reused 0 (delta 0) To git@github.com:Glavin001/SMMApp2.git    1c3a8f3..0267e0a  yourname -&gt; yourname ``` -----  "
});

documentTitles["developers.html#post-any-questions-on-the-issues-pagehttpsgithubcomglavin001smmapp2issueslabelsquestion"] = "[Post any questions on the Issues page.](https://github.com/Glavin001/SMMApp2/issues?labels=question)";
index.add({
    url: "developers.html#post-any-questions-on-the-issues-pagehttpsgithubcomglavin001smmapp2issueslabelsquestion",
    title: "[Post any questions on the Issues page.](https://github.com/Glavin001/SMMApp2/issues?labels=question)",
    body: "#### [Post any questions on the Issues page.](https://github.com/Glavin001/SMMApp2/issues?labels=question)  ----- "
});

documentTitles["developers.html#next-page-developing-a-pagedevelop-pagemd"] = "[Next page: Developing a Page](develop_page.md)";
index.add({
    url: "developers.html#next-page-developing-a-pagedevelop-pagemd",
    title: "[Next page: Developing a Page](develop_page.md)",
    body: "### [Next page: Developing a Page](develop_page.md) "
});



documentTitles["develop-page.html#developing-a-page"] = "Developing a Page";
index.add({
    url: "develop-page.html#developing-a-page",
    title: "Developing a Page",
    body: "# Developing a Page  "
});

documentTitles["develop-page.html#introductions"] = "Introductions";
index.add({
    url: "develop-page.html#introductions",
    title: "Introductions",
    body: "## Introductions First thing to know is that we are using [Jade, the Node template engine,](http://jade-lang.com/) and [Stylus for more robust CSS](http://learnboost.github.io/stylus/docs/middleware.html). Furthermore, [Node's Express framework]([http://expressjs.com/) is being used to serve the webpages and handle all HTTP requests.  "
});

documentTitles["develop-page.html#structure-of-the-app"] = "Structure of the App";
index.add({
    url: "develop-page.html#structure-of-the-app",
    title: "Structure of the App",
    body: "## Structure of the App The App starts on the repository's root directory, `/`. The Node.js server is the file `/app.js`. The `/app.js` server sets up [Express](http://expressjs.com/) and includes the file `/app/server/router.js` to handle the server requests. The `/app/server/router.js` takes in the argument, `app` (which is a variable for the [Express application](http://expressjs.com/api.html)), and binds all of the request handlers. The `router.js` file is *very important* for modifying existing and adding new request handlers, even adding new pages/views (See below on how to add a new page).  "
});

documentTitles["develop-page.html#about-pages-or-views"] = "About Pages (or Views)";
index.add({
    url: "develop-page.html#about-pages-or-views",
    title: "About Pages (or Views)",
    body: "## About Pages (or Views) Since we are using Node.js with Express, our web app *pages are views*.  These views are [\&quot;rendered\&quot; with Express](http://expressjs.com/api.html#app.render). All of our views are located in `/app/server/views`.   "
});

documentTitles["develop-page.html#adding-a-new-pageview"] = "Adding a new Page/View";
index.add({
    url: "develop-page.html#adding-a-new-pageview",
    title: "Adding a new Page/View",
    body: "### Adding a new Page/View There are a few steps to add new view to the app. "
});

documentTitles["develop-page.html#1-create-a-jade-view"] = "1) Create a Jade View";
index.add({
    url: "develop-page.html#1-create-a-jade-view",
    title: "1) Create a Jade View",
    body: "#### 1) Create a Jade View Create a new file in `/app/server/views/` with the extension `.jade`. For this tutorial we will call it `example.jade` at path `/app/server/views/example.jade`. "
});

documentTitles["develop-page.html#2-editing-your-custom-jade-view"] = "2) Editing Your Custom Jade View";
index.add({
    url: "develop-page.html#2-editing-your-custom-jade-view",
    title: "2) Editing Your Custom Jade View",
    body: "#### 2) Editing Your Custom Jade View "
});

documentTitles["develop-page.html#21-basic-example"] = "2.1) Basic Example";
index.add({
    url: "develop-page.html#21-basic-example",
    title: "2.1) Basic Example",
    body: "##### 2.1) Basic Example The app already has a `layout_nav.jade` file which contains the foundation for each webpage and can be extended. Here is the start of the contents of `example.jade`. ```jade extends layout_nav block header block content block scripts ``` "
});

documentTitles["develop-page.html#22-including-external-files-in-jade-view"] = "2.2) Including External Files in Jade View";
index.add({
    url: "develop-page.html#22-including-external-files-in-jade-view",
    title: "2.2) Including External Files in Jade View",
    body: "##### 2.2) Including External Files in Jade View You can add external `CSS` files into `/app/public/css/` with either the extention `.css` or `.styl`.  Note that `.styl` is for [Stylus Express middleware](http://learnboost.github.io/stylus/) and allows for more robust CSS.  The `.styl` CSS files will be \&quot;compiled\&quot; into `.css` files when requested, so treat `example.styl` as it's resulting `example.css` file when including. You can include a custom CSS file into your Jade view by adding the following line to your `header` [block](http://www.devthought.com/code/use-jade-blocks-not-layouts/). ` link(rel='stylesheet', href='/css/example.css')` The resulting `example.jade` is: ```jade extends layout_nav block header   link(rel='stylesheet', href='/css/example.css') block content block scripts ``` External `JavaScript` files into `/app/public/js/`.  You can include a custom JavaScript file into your Jade view by adding the following line to your `scripts` [block](http://www.devthought.com/code/use-jade-blocks-not-layouts/). ` script(src='/js/example.js')` The resulting `example.jade` is: ```jade extends layout_nav block header   link(rel='stylesheet', href='/css/example.css') block content block scripts  script(src='/js/example.js') ``` Notice that `/js/example.js` and `/css/example.css` equate to `/app/public/js/example.js` and `/app/public/css/example.styl` respectively.  "
});

documentTitles["develop-page.html#3-configure-router"] = "3) Configure Router";
index.add({
    url: "develop-page.html#3-configure-router",
    title: "3) Configure Router",
    body: "#### 3) Configure Router Now that you have created your new custom view you must [allow Express to \&quot;render\&quot; your view to your users when requested](http://expressjs.com/api.html#app.render). "
});

documentTitles["develop-page.html#31-basic"] = "3.1) Basic";
index.add({
    url: "develop-page.html#31-basic",
    title: "3.1) Basic",
    body: "##### 3.1) Basic Changes are made inside of `/app/server/router.js` module: ```javascript module.exports = function(app) { // existing code.... // *** PUT NEW CODE HERE **** } ``` Here is a simple GET request handler for your example view.  ```javascript 	app.get('/example', function(req, res) { 		res.render('example', { 			title : 'Example Title', 			countries : CT, 			udata : req.session.user 		}); 	}); ``` When the user requests the page `/example` Express receives a `GET` request for that resource and it triggers that event handler code shown above. You may change the `app.get('/example', function(req, res) { }` to `app.get('/another', function(req, res) { }` handle `another` request. Express then calls your [callback function](http://stackoverflow.com/a/9644980) with the arguments `req` and `res` which refer to [request](http://expressjs.com/api.html#req.params) and [response](http://expressjs.com/api.html#res.status). You can extract more information about the request from the request variable, `req`, and then output to the user through the response variable, `res`. [Rendering a view to the user is as simple as `res.render('filename')`.](http://expressjs.com/api.html#res.render) `res.render('example');` will render the view `/app/server/views/example.jade`. The Jade template view can use variables that are passed in the second parameter or `res.render`. For example, `res.render('example', { title: 'Example title' });` passes the variable `title` to be used in the rendering of the `example.jade` file. You can see where it is used in the Jade template `/app/server/layout_nav.jade` with `title #{title}`. The `#{title}` is printing the contents of the variable. See [Jade Language Reference for more information](http://jade-lang.com/reference/).  "
});

documentTitles["develop-page.html#32-page-requiring-login"] = "3.2) Page Requiring Login";
index.add({
    url: "develop-page.html#32-page-requiring-login",
    title: "3.2) Page Requiring Login",
    body: "##### 3.2) Page Requiring Login It may be desirable to restrict access to a certain page to only users who are logged in. This can now be easily achieved with `requiresLogin` function. `requiresLogin` takes in three (3) parameters: `request`, `response`, and `callback` for cases where user is already logged in. The `callback` takes two (2) parameters: `request`, `response`.  Notice the Express `request` and `response` variables are passed along to `requiresLogin` and then onto your callback function. Here is the example from above, now with the added requirement of user login, if they are not already logged in. ```javascript 	app.get('/example', function(req, res) { 		requiresLogin(req, res, function(req, res) { 			res.render('example', { 				title : 'Example title', 				countries : CT, 				udata : req.session.user 			}); 		}); 	}); ```  -----  Hopefully this documentation is detailed enough. [If you have any additional questions, please make a new issue and add the `Question` label.](https://github.com/Glavin001/SMMApp2/issues?labels=question) "
});



documentTitles["troubleshooting.html#troubleshooting"] = "Troubleshooting";
index.add({
    url: "troubleshooting.html#troubleshooting",
    title: "Troubleshooting",
    body: "# Troubleshooting  List of common and easily solvable issues.  "
});

documentTitles["troubleshooting.html#installation"] = "Installation";
index.add({
    url: "troubleshooting.html#installation",
    title: "Installation",
    body: "## Installation There are currently no known installation issues.  If you find an error, please add it as an Issue with instructions on how to reproduce.  Make sure you have followed the installation instructions closely.  "
});

documentTitles["troubleshooting.html#running"] = "Running";
index.add({
    url: "troubleshooting.html#running",
    title: "Running",
    body: "## Running  "
});

documentTitles["troubleshooting.html#redis-not-running"] = "Redis not running";
index.add({
    url: "troubleshooting.html#redis-not-running",
    title: "Redis not running",
    body: "### Redis not running  "
});

documentTitles["troubleshooting.html#error-message"] = "Error message:";
index.add({
    url: "troubleshooting.html#error-message",
    title: "Error message:",
    body: "#### Error message:  ```bash events.js:72         throw er; // Unhandled 'error' event               ^ Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED     at RedisClient.on_error (/Users/glavin/Documents/Project Dev/SMMApp2/node_modules/socket.io/node_modules/redis/index.js:149:24)     at Socket.&lt;anonymous&gt; (/Users/glavin/Documents/Project Dev/SMMApp2/node_modules/socket.io/node_modules/redis/index.js:83:14)     at Socket.EventEmitter.emit (events.js:95:17)     at net.js:426:14     at process._tickCallback (node.js:415:13) ```  "
});

documentTitles["troubleshooting.html#solution"] = "Solution:";
index.add({
    url: "troubleshooting.html#solution",
    title: "Solution:",
    body: "#### Solution:  1) Start redis-server, or  2) add the `--disable-redis-server` argument. For instance, `node app.js --disable-redis-server`.  =====  "
});

documentTitles["troubleshooting.html#mongodb-not-running"] = "MongoDB not running";
index.add({
    url: "troubleshooting.html#mongodb-not-running",
    title: "MongoDB not running",
    body: "### MongoDB not running  "
});

documentTitles["troubleshooting.html#error-message"] = "Error Message:";
index.add({
    url: "troubleshooting.html#error-message",
    title: "Error Message:",
    body: "#### Error Message: ```bash [Error: failed to connect to [localhost:27017]] ```  "
});

documentTitles["troubleshooting.html#solution"] = "Solution:";
index.add({
    url: "troubleshooting.html#solution",
    title: "Solution:",
    body: "#### Solution: [Start mongod.](http://docs.mongodb.org/manual/tutorial/manage-mongodb-processes/#start-mongod)  =====  "
});

documentTitles["troubleshooting.html#dependency-not-installed"] = "Dependency not installed";
index.add({
    url: "troubleshooting.html#dependency-not-installed",
    title: "Dependency not installed",
    body: "### Dependency not installed The following error occurs when the Node dependencies are not installed.  "
});

documentTitles["troubleshooting.html#error-message"] = "Error message:";
index.add({
    url: "troubleshooting.html#error-message",
    title: "Error message:",
    body: "#### Error message:   ```bash module.js:340     throw err;           ^ Error: Cannot find module 'XYZ'     at Function.Module._resolveFilename (module.js:338:15)     at Function.Module._load (module.js:280:25)     at Module.require (module.js:362:17)     at require (module.js:378:17)     at Object.&lt;anonymous&gt; (C:\Users\Owner\Projects\SMMApp2\app.js:24:15)     at Module._compile (module.js:449:26)     at Object.Module._extensions..js (module.js:467:10)     at Module.load (module.js:356:32)     at Function.Module._load (module.js:312:12)     at Module.runMain (module.js:492:10) ```  "
});

documentTitles["troubleshooting.html#solution"] = "Solution:";
index.add({
    url: "troubleshooting.html#solution",
    title: "Solution:",
    body: "#### Solution:  ```bash npm install npm update ```  "
});



documentTitles["testing.html#test-benchmark"] = "Test / Benchmark";
index.add({
    url: "testing.html#test-benchmark",
    title: "Test / Benchmark",
    body: "# Test / Benchmark Start the server app. In your web browser go to [http://localhost:8080/admin](http://localhost:8080/admin). Then execute the following: ```bash npm test ``` And follow the on screen instructions. "
});


