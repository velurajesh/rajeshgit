var chalk = require('chalk'); // font formatting package
var mongoose = require('mongoose') // mongoose driver package to talk to MongoDB

// mongoLab URL (or) local database url 
var dbLocation = 'mongodb://rajeshUser:rajeshUser@ds147905.mlab.com:47905/rajeshcloud';
	console.log(chalk.yellow("Database location path loaded... "));

// CONNECTIONS BEING PREPARED HERE TO BE USED LATER BY MONGOOSE... 
mongoose.connect(dbLocation); 
	// .ON is a listener 
	mongoose.connection.on('connected', function(){ // on connected status do the following
		console.log(chalk.yellow('Mongoose has successfully connected to : '+ dbLocation));
	});

	mongoose.connection.on('error', function (err) { // on error do this
		 console.log(chalk.red('Mongoose connection Error :' + err));  
	})

	mongoose.connection.on('disconnect', function(){ // on disconnect do this....
		console.log(chalk.red('Mongoose disconnected from database....'));


	});


// DEFINE SCHEMA to store in the Database  -> Collection
var userSchema = new mongoose.Schema(  
		{   // defining schema for adding to collections
			username: {type: String, unique:true},
			email:{type: String, unique:true},
			password:{ type: String } 
		}, 
		
		{collection: 'usersCollection'} // Collection name from DB
		
		);

var devHelpSchema = new mongoose.Schema(
		{
			nodeCommands: {type: String, unique:true},
			description: {type: String}
		},

		{collection: 'devHelpCollection'} // Collection name from DB

	);

// REGISTERING SCHEMAs created above to create a Model
mongoose.model( 'userModel', userSchema); // create model
mongoose.model( 'devHelpModel', devHelpSchema); // create model
















