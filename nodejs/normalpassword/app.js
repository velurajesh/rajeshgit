// DECLARE ALL PACKAGES THAT IS REQUIRED IN YOUR APP

var myExpress = require('express');
var myBodyParser = require ('body-parser');
var mySession = require('express-session');
var myHandleBars = require('express-handlebars');
var chalk = require('chalk');
var myDB = require('./models/db.js'); // db.js is required before routes
var myApp = module.exports = myExpress() // exporting apps must be done before routes.js
var myRoutes = require('./routes/routes.js')
var myNet = require('net'); // net is a In-built Node module - ( Eg. In-built Node modules like - events, stream, fs, net, util, os, http, express, Nodemon )
							// The net module provides you with an asynchronous network wrapper (TCP/IP). 
							// It contains functions for creating both servers and clients (called streams).
							// You can include this module with require('net');.


// SPECIFY WHAT THE WEBSERVER HAS TO DO NOW
myApp.use(myExpress.static(__dirname + "/public")); // creating a public folder like in the webserver 
												// to identify the default folder 
												// wheN a  get request is received
myApp.use(myBodyParser.json()); //  This needed to have a json object communication between the server and client.

myApp.use(myBodyParser.urlencoded({extended:false})); // extended:false = Not very compled objects / True means sending very complex objects.
// the urlencoded extended: should be explicitly specified as there is no default value to it. 

myApp.use(mySession({secret:"secret", resave: true, saveUninitialized: false })); // Needed if you deploy in clustered environment ( this is mainly to decide by the DB administrator / web server administrator. )

myApp.set('view engine', 'handlebars'); // setting the view engine template.  This can be JADE also. 

myApp.engine('handlebars', myHandleBars({defaultLayout:'myLayout.handlebars'})); 
// 


// WRITE GET & POST REQUEST HANDLERS HERE

// this will refer to Eg.: loginPageHandler() function Block & so on... 
// in routes.js file in routes folder ( see file routes.js for reference )
// This will have to match the method attribute of FORM being submitted in .handlebars file.
myApp.get('/', myRoutes.loginPageHandler); 
myApp.get('/logout', myRoutes.logoutPageHandler);
myApp.post('/auth', myRoutes.loginAuthHandler);
myApp.get('/console', myRoutes.consoleHandler);
myApp.get('/registerForm', myRoutes.registerFormHandler);
myApp.post('/register', myRoutes.registerHandler);
myApp.get('/edit', myRoutes.editPageHandler);
myApp.post('/saveChanges', myRoutes.saveChangesHandler);
myApp.get('/delete', myRoutes.deletePageHandler);
myApp.get('/addForm', myRoutes.addFormHandler);
myApp.post('/add', myRoutes.addHandler);


// ERROR HANDLING 

// client side errors to be declared here based on status of error
myApp.use("*", function(request, response) {
	response.status(404);
	response.render('message.handlebars',
		{message:'<blockquote class="mainLines"> <code>The page you are looking for is not available or may have been moved.</code> </blockquote>'}
		);

});

// server side errors based on status 
myApp.use("*", function(request, response) {
	response.status(500);
	response.render('message.handlebars',
		{message:'<blockquote class="mainLines"> <p>Something went wrong as you tried to access this page.</p> <p> Probably this happened because there are some bugs in the application. </p> </blockquote>'}
		);

});

// assign port based on availability whether running locally or via Heroku Cloud

var port = process.env.PORT || 3000; // If running locally use port 3000 ( eg: http://localhost:3000 or whatever the server assigns dynamically )

console.log("Checking the availability of port %d", port); // show port number assigned


// Create a new TCP/IP server.  This is a lighter weight server than the HTTP server.
var myWebServer = myNet.createServer();

// Handling errors while listening / or attempting to listen.  Should be written before calling the listen method below
myWebServer.once('error', function(err) {
  if (err.code === 'EADDRINUSE') {
    console.log(chalk.red("port %d is currently in use", port));
    return; // specified explicitly in case of error to terminate the program
  }
});

// This is where you attach your TCP/IP server to the Listener.  
myWebServer.listen(port, function(){
    console.log(chalk.green('Net server is able to listen on port: ' + port));
    
myWebServer.close(); // Closing the TCP/IP Light weight server as we will be using the HTTP server. This is basically to check if the HTTP server will work or not. This is just like testing the Music System is working when connected to the power socket... example... for understanding. 

    console.log(chalk.green('Closing Net server on port: ' + port));

// This is the actual HTTP Server we need to attach to the port for listening ( don't confuse with the Light weight server )
myApp.listen(port, function(){
        console.log(chalk.green("Http server is listening on port [" + port + '] '));
    });
});






























