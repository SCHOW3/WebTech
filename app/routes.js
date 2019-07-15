var request = require('request');

module.exports = function(app) {

	app.get('/ip-api/*', function(req, res) {
		console.log("came inside get");


		
			request('http://ip-api.com/json', function (error, response, body) {
			    if (!error && response.statusCode == 200) {
			        console.log(body); 
			        res.json(body);// Print the google web page.
			     }
			})


		// xmlhttp.open("GET", "http://ip-api.com/json", false);
		// 	xmlhttp.send();
		// 	if (xmlhttp.status != 200) {
		// 		throw FileNotFoundException;
		// 	}
		// use mongoose to get all todos in the database
		// Todo.find(function(err, todos) {

		// 	// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		// 	if (err)
		// 		res.send(err)

		// 	res.json(todos); // return all todos in JSON format
		// });
	});


	// api ---------------------------------------------------------------------
	// get all todos
	// app.get('/api/todos', function(req, res) {
	// 	console.log("came inside get");

		// use mongoose to get all todos in the database
		// Todo.find(function(err, todos) {

		// 	// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		// 	if (err)
		// 		res.send(err)

		// 	res.json(todos); // return all todos in JSON format
		// });
	// });

	// create todo and send back all todos after creation
	// app.post('/api/todos', function(req, res) {
	// 	console.log("came inside post");

		// create a todo, information comes from AJAX request from Angular
		// Todo.create({
		// 	text : req.body.text,
		// 	done : false
		// }, function(err, todo) {
		// 	if (err)
		// 		res.send(err);

		// 	// get and return all the todos after you create another
		// 	Todo.find(function(err, todos) {
		// 		if (err)
		// 			res.send(err)
		// 		res.json(todos);
		// 	});
		// });

	// });

	// delete a todo
	// app.delete('/api/todos/:todo_id', function(req, res) {
	// 	console.log("came inside delete");
		// Todo.remove({
		// 	_id : req.params.todo_id
		// }, function(err, todo) {
		// 	if (err)
		// 		res.send(err);

		// 	// get and return all the todos after you create another
		// 	Todo.find(function(err, todos) {
		// 		if (err)
		// 			res.send(err)
		// 		res.json(todos);
		// 	});
		// });
	// });


	app.get('/place/*', function(req, res) {
		// console.log("/place/nearbysearch/");
		// console.log("req.originalUrl "+req.originalUrl);
		// console.log("urllll "+'https://maps.googleapis.com/maps/api'+req.originalUrl);
			request('https://maps.googleapis.com/maps/api'+req.originalUrl+"&key=AIzaSyDfJRYMqy1skTG4zPbBhhQBNF0ngnDLEUI", function (error, response, body) {
			    if (!error && response.statusCode == 200) {
			        // console.log(body); 
			        var json = JSON.parse(body);
			        res.send(json);
			        // res.json(body);// Print the google web page.
			     }
			})
	});

	app.get('/directions/*',function(req,res){

	console.log(" req.origin" +req.originalUrl);
		console.log(" req.destination"+req.query.destination);
		var url ="https://maps.googleapis.com/maps/api/directions/json?origin="+req.query.origin+"&destination="+req.query.destination+"&mode="+req.query.mode +"&key=AIzaSyBDIaOeP0fVpdj3NiCOE-BfsZiIWn-rPoE";
		console.log( " url" +url); 
		request(url, function (error, response, body) {
			    if (!error && response.statusCode == 200) {
			        // console.log(body); 
			        var json = JSON.parse(body);
			        res.send(json);// Print the google web page.

			     }
			})
	

	});


	app.get("/yelp-reviews/*", function(req, res){
		console.log("came inside yelp-reviews");
		var fullUrl = "https://api.yelp.com/v3/businesses/"+req.query.id+ "/reviews";
		request({
			headers:{
				'Authorization' : "Bearer 4Hblzl5a7cN21wW198TpxfFvYhCf8W4TLjztWvr3FIw_O4r1hAJcgbXu-DMX28xTFKtpkWp8mG8bx1lj8PkrjIKf3c1eCteUq3rRrUWwWxuxtxWazMiY3L9GO0DEWnYx"
			},
			url : fullUrl,
			method : "GET"
		}, function(error, response, body){
			if(!error && response.statusCode == 200){
				console.log(body);
				//res.json(body);
				var json = JSON.parse(body);
		        res.send(json);
			}
		})
	});

	app.get("/yelp-id/*", function(req,res){
		console.log("came inside yelp-id");
		var fullUrl = "https://api.yelp.com/v3/businesses/matches/best?name="+req.query.name+"&city="+req.query.city+"&state="+req.query.state+"&country="+req.query.country+"&address1="+req.query.address1+"&";
		console.log("fullUrl", fullUrl);
		/*var configGet = {
			method: 'GET',
			url: fullUrl,
			headers: "Bearer 4Hblzl5a7cN21wW198TpxfFvYhCf8W4TLjztWvr3FIw_O4r1hAJcgbXu-DMX28xTFKtpkWp8mG8bx1lj8PkrjIKf3c1eCteUq3rRrUWwWxuxtxWazMiY3L9GO0DEWnYx"
		};*/
		request(
			{
			headers: {
				'Authorization' : "Bearer 4Hblzl5a7cN21wW198TpxfFvYhCf8W4TLjztWvr3FIw_O4r1hAJcgbXu-DMX28xTFKtpkWp8mG8bx1lj8PkrjIKf3c1eCteUq3rRrUWwWxuxtxWazMiY3L9GO0DEWnYx"
			},
			url : fullUrl,
			method: 'GET'
		}, function(error, response, body){
			if(!error && response.statusCode == 200){
				console.log(body);
				//res.json(body);
				var json = JSON.parse(body);
		        res.send(json);
			}
		})
	});

	app.get('/api/geocode/*', function(req, res) {
		console.log("came inside otherLocation");
			request('https://maps.googleapis.com/maps'+req.originalUrl, function (error, response, body) {
			    if (!error && response.statusCode == 200) {
			        console.log(body); 
			        //res.json(body);// Print the google web page.
			        var json = JSON.parse(body);
			        res.send(json);
			     }
			})
	});

	app.get('/search-nearby/*', function(req, res){
	//http://localhost:8080/search-nearby/?lat=34.0266&lon=-118.2831&type=default&miles=10&keyword=usc
	//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.0266,-118.2831&radius=16093.44&type=default&keyword=usc&key=AIzaSyA5P5sqp4Y3-42xJc6Rl7XPZU9K7sn4Aic
		console.log("came inside search-nearby");
		var api_key = "AIzaSyA5P5sqp4Y3-42xJc6Rl7XPZU9K7sn4Aic";
		var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
		var lat = req.query.lat;
		var lon = req.query.lon;
		var type = req.query.type;
		var radius = req.query.mile * 1609.344;
		console.log(typeof(radius));
		var keyword = req.query.keyword;
		var fullUrl = url + "location="+lat+","+lon+"&radius="+radius+"&type="+type+"&keyword="+keyword+"&key="+api_key;
		console.log(fullUrl);
		console.log([lat, lon, type, radius, keyword]);
		request(fullUrl, function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        //console.log(body); 
		        //res.json(body);// Print the google web page.
		        var json = JSON.parse(body);
		        res.send(json);
		     }
		})
	});

	app.get('/search-next/*', function(req, res){
		console.log('came inside search-next');
		var api_key = "AIzaSyCAfmTpgd6WwFhP1V8W0Ehh8vFfPYmzB3A";
		var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
		var fullUrl = url + "pagetoken="+req.query.next + "&key="+api_key;
		request(fullUrl, function(error, response, body){
			if(!error && response.statusCode == 200){
				var json = JSON.parse(body);
				res.send(json);
			}
		})
	});
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		console.log("came inside get *");
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};