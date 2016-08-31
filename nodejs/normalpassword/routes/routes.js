var chalk = require('chalk'); // font formatting package
var mongoose = require('mongoose') // mongoose driver package to talk to MongoDB

// STORE MODELS
var myUserModel = mongoose.model('userModel'); 
var myDevHelpModel = mongoose.model('devHelpModel');

var myAppRef = require('../app.js'); // main file reference

var loginStatusId = 0; // set to 0 by default meaning = User not logged in....

// HANDLE PAGE REQUEST & RESPONSES 

//loginPageHandler -- refer to app.js for route defenition part
exports.loginPageHandler = function (request, response) {
	response.render('login.handlebars', {loginStatus: loginStatusId }); // Looks in FOLDER: /views for handlebars template files
}; 

//logoutPageHandler -- refer to app.js for route defenition part
exports.logoutPageHandler = function (request, response){
	request.session.destroy(); // destroy logged in session when logout is initiated
	loginStatusId = 0; // on logout set login status to 0
	response.render('message.handlebars', {message:'<span class="label label-success">You have logged-out successfully</span>', loginStatus: loginStatusId});
};

//loginAuthHandler -- refer to app.js for route defenition part
exports.loginAuthHandler = function (request, response) {

	var userName = request.body.username; // getting the username & password from user submission 
	var userPass = request.body.password; 
	var authResult;
	// checking if username exists
	myUserModel.findOne({username: userName}, function(error, userObject){
		if(userObject === null){
			authResult = '<span class="label label-danger">Login Failed: User name does not exist in db</span>';
      response.render('message.handlebars',{message:authResult, loginStatus: loginStatusId});
		} else if (userPass === userObject.password){ // checking against database collection for password match
			authResult = '<span class="label label-success">Login successful</span>';
			loginStatusId = 1;

			request.url = '/console'; // After loggin in take the user to the Console page programatically. ( This will take the user to the /console page which you want to show to the user after logging in. )
			request.method = 'get';
			myAppRef._router.handle(request, response); // _router has got all the route defenitions
			
		} else {
			authResult = '<span class="label label-danger">Login Failed : Passwords did not match. </span>';
			response.render('message.handlebars',{message:authResult, loginStatus: loginStatusId});
		}
    // %s is a C language to specify the string being passed.
		console.log('Login Name %s, Password %s. Login outcome [%s]', userName, userPass, authResult);
	})// END userModel.findOne

}; // END loginAuthHandler


// consoleHandler 
exports.consoleHandler = function (request, response) {
  //This will also catch any unauthorised access to the URL /console 
  if (loginStatusId){
        console.log('User has logged in...')
  }else{
    response.status(500); 
    response.send("Incorrect request");
    return;
    } // end of loginStatus check
  
  var recordsArray; //to keep all nodeJS help records
  myDevHelpModel.find({}, function(error, devHelpArray){
    if (!error){
      recordsArray = devHelpArray;
      response.render('console.handlebars', {recordsArray:recordsArray,loginStatus: loginStatusId});
      } 
  }); //devHelpModel.find       
}; //consoleHandler


//registerFormHandler
exports.registerFormHandler = function(request, response){
   response.render("register.handlebars", {loginStatus: loginStatusId});
}; 

//registerHandler
exports.registerHandler = function(request, response){
   
   console.log('reached registerHandler 1');
   // this creates a blank row in the memory and populates the records
   var newuser = new myUserModel();
   newuser.username = request.body.username;;
   newuser.email = request.body.email;
   newuser.password = request.body.password;

   console.log('reached registerHandler 2');
   //save from memory record to db through model :: Add a record
   newuser.save(function(error, savedUser){ 
       console.log('reached registerHandler save');
     if(error){ //username: {type: String, unique:true} helps check this condition
       var message = "A user already exists with that username or email";
       console.log(message);
       // user getting diverted to registration page to fill in correct details
       response.render("register.handlebars", {errorMessage:message, 
                                          loginStatus: loginStatusId});
     }else{ 
         console.log('reached registerHandler Else save');
       response.render('message.handlebars', 
       	{message:'<span class="label label-success">Registration successful</span>', loginStatus: loginStatusId});
     }
   }); //newuser.save
};//registerHandler


//editPageHandler
exports.editPageHandler = function(request, response){
  var recordToEdit = request.query.tech; // this gets the query from console.handlebars ( <td><a href='/edit?tech={{this.nodeCommands}}'>)
    myDevHelpModel.findOne({nodeCommands:recordToEdit}, function(err, techRec){
    if (!err){
      console.log(chalk.yellow("Going to edit -> [" + techRec.nodeCommands + " : " + techRec.description + "]"));
      response.render('editPage.handlebars', {techRec: techRec, loginStatus: loginStatusId});
    } 
}); //myDevHelpModel.findOne
}; //editPageHandler


//saveChangesHandler
exports.saveChangesHandler = function(request, response){ //???????
  var nodeRequest = request.body.techName;
  var descRequest = request.body.techDesc;
  console.log("Saving Edited records : " + nodeRequest + " : " + descRequest);
  var message;
  //update rec through model
  myDevHelpModel.update({nodeCommands:nodeRequest}, 
                    {$set: { description: descRequest }}, 
                    {multi:false}, 
                    function(err, updatedRec){
   if(err){
     message = '<span class="label label-danger">Update Failed</span>';
     console.log(chalk.red(message));
     response.render('message.handlebars', {message: message, loginStatus: loginStatusId});
   }else{
     message = '<span class="label label-success">A record saved succesfully</span>';
     console.log(chalk.green(message));
     response.render('message.handlebars', {message: message, loginStatus: loginStatusId});
   }
  });
}; //saveChangesHandler

// deletePageHandler
exports.deletePageHandler = function(req, res){
  var rowToDelete = req.query.tech;
  myDevHelpModel.remove({nodeCommands:rowToDelete}, function(err, deleteRow){
  if (err){
      console.log('Error while deleting.....');
    
  } else {
    var message = '<span class="label label-success">A record removed successfully</span>'
    res.render('message.handlebars', {message: message, loginStatus: loginStatusId});
  }
}); //devHelpModel.remove
}; //deletePageHandler

//addFormHandler
exports.addFormHandler = function(req, res){
    res.render('add.handlebars', {loginStatus: loginStatusId});
 }; //addFormHandler

//addHandler
exports.addHandler = function(req, res){
  var message;
  // creating a blank row in memory
  var newRow = new myDevHelpModel();
  // populating the blank row here
  newRow.nodeCommands = req.body.techname; // this should match the add.handlebars "name"
  newRow.description = req.body.techdesc;// this should match the add.handlebars "name"
   
   //saving the newRow to db through model :: Add a record
   newRow.save(function(err, savedUser){
     if(err){
       message = '<span class="label label-danger">A record already exists with given technology</span>';
       console.log(message);
       res.render("message.handlebars", {message:message, loginStatus: loginStatusId});
     }else{
       message = '<span class="label label-success">A new technology added successfully</span>';
       res.render('message.handlebars', {message:message, loginStatus: loginStatusId});
     }
   }); //newRow.save
}; //addHandler



































