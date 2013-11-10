# Developing a Page

## Introductions
First thing to know is that we are using [Jade, the Node template engine,](http://jade-lang.com/) and [Stylus for more robust CSS](http://learnboost.github.io/stylus/docs/middleware.html).
Furthermore, [Node's Express framework]([http://expressjs.com/) is being used to serve the webpages and handle all HTTP requests.

## Structure of the App
The App starts on the repository's root directory, `/`. The Node.js server is the file `/app.js`.
The `/app.js` server sets up [Express](http://expressjs.com/) and includes the file `/app/server/router.js` to handle the server requests.
The `/app/server/router.js` takes in the argument, `app` (which is a variable for the [Express application](http://expressjs.com/api.html)), and binds all of the request handlers.
The `router.js` file is *very important* for modifying existing and adding new request handlers, even adding new pages/views (See below on how to add a new page).

## About Pages (or Views)
Since we are using Node.js with Express, our web app *pages are views*. 
These views are ["rendered" with Express](http://expressjs.com/api.html#app.render).
All of our views are located in `/app/server/views`. 

### Adding a new Page/View
There are a few steps to add new view to the app.
#### 1) Create a Jade View
Create a new file in `/app/server/views/` with the extension `.jade`.
For this tutorial we will call it `example.jade` at path `/app/server/views/example.jade`.
#### 2) Editing Your Custom Jade View
##### 2.1) Basic Example
The app already has a `layout_nav.jade` file which contains the foundation for each webpage and can be extended.
Here is the start of the contents of `example.jade`.
```jade
extends layout_nav
block header
block content
block scripts
```
##### 2.2) Including External Files in Jade View
You can add external `CSS` files into `/app/public/css/` with either the extention `.css` or `.styl`. 
Note that `.styl` is for [Stylus Express middleware](http://learnboost.github.io/stylus/) and allows for more robust CSS. 
The `.styl` CSS files will be "compiled" into `.css` files when requested, so treat `example.styl` as it's resulting `example.css` file when including.
You can include a custom CSS file into your Jade view by adding the following line to your `header` [block](http://www.devthought.com/code/use-jade-blocks-not-layouts/).
` link(rel='stylesheet', href='/css/example.css')`
The resulting `example.jade` is:
```jade
extends layout_nav
block header
  link(rel='stylesheet', href='/css/example.css')
block content
block scripts
```
External `JavaScript` files into `/app/public/js/`. 
You can include a custom JavaScript file into your Jade view by adding the following line to your `scripts` [block](http://www.devthought.com/code/use-jade-blocks-not-layouts/).
` script(src='/js/example.js')`
The resulting `example.jade` is:
```jade
extends layout_nav
block header
  link(rel='stylesheet', href='/css/example.css')
block content
block scripts
 script(src='/js/example.js')
```
Notice that `/js/example.js` and `/css/example.css` equate to `/app/public/js/example.js` and `/app/public/css/example.styl` respectively.

#### 3) Configure Router
Now that you have created your new custom view you must [allow Express to "render" your view to your users when requested](http://expressjs.com/api.html#app.render).
##### 3.1) Basic
Changes are made inside of `/app/server/router.js` module:
```javascript
module.exports = function(app) {
// existing code....
// *** PUT NEW CODE HERE ****
}
```
Here is a simple GET request handler for your example view. 
```javascript
	app.get('/example', function(req, res) {
		res.render('example', {
			title : 'Example Title',
			countries : CT,
			udata : req.session.user
		});
	});
```
When the user requests the page `/example` Express receives a `GET` request for that resource and it triggers that event handler code shown above.
You may change the `app.get('/example', function(req, res) { }` to `app.get('/another', function(req, res) { }` handle `another` request.
Express then calls your [callback function](http://stackoverflow.com/a/9644980) with the arguments `req` and `res` which refer to [request](http://expressjs.com/api.html#req.params) and [response](http://expressjs.com/api.html#res.status).
You can extract more information about the request from the request variable, `req`, and then output to the user through the response variable, `res`.
[Rendering a view to the user is as simple as `res.render('filename')`.](http://expressjs.com/api.html#res.render)
`res.render('example');` will render the view `/app/server/views/example.jade`.
The Jade template view can use variables that are passed in the second parameter or `res.render`.
For example, `res.render('example', { title: 'Example title' });` passes the variable `title` to be used in the rendering of the `example.jade` file.
You can see where it is used in the Jade template `/app/server/layout_nav.jade` with `title #{title}`.
The `#{title}` is printing the contents of the variable. See [Jade Language Reference for more information](http://jade-lang.com/reference/).

##### 3.2) Page Requiring Login
It may be desirable to restrict access to a certain page to only users who are logged in.
This can now be easily achieved with `requiresLogin` function.
`requiresLogin` takes in three (3) parameters: `request`, `response`, and `callback` for cases where user is already logged in.
The `callback` takes two (2) parameters: `request`, `response`. 
Notice the Express `request` and `response` variables are passed along to `requiresLogin` and then onto your callback function.
Here is the example from above, now with the added requirement of user login, if they are not already logged in.
```javascript
	app.get('/example', function(req, res) {
		requiresLogin(req, res, function(req, res) {
			res.render('example', {
				title : 'Example title',
				countries : CT,
				udata : req.session.user
			});
		});
	});
```

-----

Hopefully this documentation is detailed enough. [Please make a new issue if you have any additional questions.](https://github.com/Glavin001/SMMApp2/issues?labels=question)
