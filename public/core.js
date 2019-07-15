var scotchTodo = angular.module('scotchTodo', ['ngAnimate']);
/*scotchTodo.filter('unsafe', function($sce){
	return function(val){
		return $sce.trustAsHtml(val);
	};
});*/
var lat = "";
var lon = "";
var placeJS = "";
var history ={
	"key1":"value1"
};
var dayMap = {0:"Sunday", 1:"Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday"};
var reviewJS = [];
var destinationLat=0;
var destinationLon=0;
var mapDetail;
var marker;
var test = [];
test[0] = 1;
console.log('test', test);
console.log(test[1]);


function mapClick(){
	console.log("clicked Map");
	console.log(destinationLat, destinationLon);
	console.log("my location:", lat, lon)
	directionsDisplay = new google.maps.DirectionsRenderer;
 	directionsService = new google.maps.DirectionsService;
 	
    map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: destinationLat, lng: destinationLon},
	    zoom: 16
  	});
     
     marker = new google.maps.Marker({
    	position:{lat:destinationLat, lng: destinationLon}, 
    	map: map
    });
    var uluru = {lat:destinationLat, lng: destinationLon}
    directionsDisplay.setMap(map);
    panorama = map.getStreetView();
    panorama.setPosition(uluru);
    panorama.setPov(/** @type {google.maps.StreetViewPov} */({
      heading: 265,
      pitch: 0
    }));
    var infowindow = new google.maps.InfoWindow();


	// var map = new google.maps.Map(document.getElementById('mapp'), {
	//   zoom: 7,
	//   center: {lat: 41.85, lng: -87.65}
	// });
	console.log(map);

	directionsDisplay.setMap(map);
	// directionsDisplay.setPanel(document.getElementById('directionsPanel'));
	directionsDisplay.setPanel(document.getElementById('right-panel'));
}

function myTest(index){
	console.log(index);
}

function initAutocomplete() {
	var address_input = document.getElementById('different-location');
	autocomplete = new google.maps.places.Autocomplete(address_input, {types: ['address']});
	var mapFrom_input = document.getElementById('mapFrom');
	autocompleteMapFrom = new google.maps.places.Autocomplete(mapFrom_input, {types: ['address']});
}

function removeRequired(){
	console.log("removeRequired");
	if(document.getElementById("different-location").required==true){
		document.getElementById("different-location").required=false;
	}
	document.getElementById('different-location').disabled=true;
}

function setRequired(){
	console.log("setRequired");
	document.getElementById('different-location').required=true;
	document.getElementById('different-location').disabled = false;
}

function fetchHere(){
	var xhr = new XMLHttpRequest;
    var json_data = NaN;
    xhr.open('GET', 'http://ip-api.com/json/', false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                json_data = JSON.parse(xhr.responseText);
                //console.log(json_data);
            }
        }
    }
    xhr.send();
    lat = json_data.lat;
    lon = json_data.lon;
    hereLat = lat;
    hereLon = lon;
    //document.getElementById('myform').elements['lat'].value = json_data.lat;
    //document.getElementById('myform').elements['lon'].value = json_data.lon;
    //document.getElementById('myform').elements['submitButton'].className = "btn btn-default";
}

function createTable(json_data){
	console.log("createTable");
}

function mainController($scope, $http) {
	console.log("inside main controller");
	$scope.formData = {};
	$scope.from = "current";
	$scope.categorys = [
		{
		"name":"Default",
		"value":"default"
		},
		{
			"name":"Airport",
			"value":"airport",
		},
		{
			"name":"Amusement Park",
			"value":"amusement_park"
		},
		{
			"name":"Aquarium",
			"value":"aquarium"
		},
		{
			"name":"Art Gallery",
			"value":"art_gallery"
		},
		{
			"name":"Bakery",
			"value":"bakery"
		},
		{
			"name":"Bar",
			"value":"bar"
		},
		{
			"name":"Beauty Salon",
			"value":"beauty_salon"
		},
		{
			"name":"Bowling Alley",
			"value":"bowling_alley"
		},
		{
			"name":"Bus Station",
			"value":"bus_station"
		},
		{
			"name":"Cafe",
			"value":"cafe"
		},
		{
			"name":"Campground",
			"value":"campground"
		},
		{
			"name":"Car Rental",
			"value":"car_rental"
		},
		{
			"name":"Casino",
			"value":"casino"
		},
		{
			"name":"Lodging",
			"value":"lodging"
		},
		{
			"name":"Movie Theater",
			"value":"movie_theather"
		},
		{
			"name":"Museum",
			"value":"museum"
		},
		{
			"name":"Night Club",
			"value":"night_club"
		},
		{
			"name":"Park",
			"value":"park"
		},
		{
			"name":"Parking",
			"value":"parking"
		},
		{
			"name":"Restaurant",
			"value":"restaurant"
		},
		{
			"name":"Shopping Mall",
			"value":"shopping_mall"
		},
		{
			"name":"Stadium",
			"value":"stadium"
		},
		{
			"name":"Subway Station",
			"value":"subway_station"
		},
		{
			"name":"Taxi Stand",
			"value":"taxi_stand"
		},
		{
			"name":"Train Station",
			"value":"train_station"
		},
		{
			"name":"Transit Station",
			"value":"transit_station"
		},
		{
			"name":"Travel Agency",
			"value":"travel_agency"
		},
		{
			"name":"Zoo",
			"value":"zoo"
		}
	];
	$scope.resultsTable = false;
	$scope.detailsTable = false;
	$scope.next_button = false;
	$scope.previous_button = false;
	$scope.detailTab = false;
	$scope.pills = false;
	$scope.pbar = true;
	$scope.offset = 0;
	$scope.photoArray = [];
	$scope.reviews_array = [];
	$scope.filterVal = "";
	$scope.showGoogle = true;
	$scope.showYelp = false;
	$scope.emptyYelp = false;
	$scope.emptyPhotos = false;
	$scope.showPhotos = true;
	$scope.panoMap = false;
	$scope.tweet = "";
 	$scope.fav_next_button = false;
 	$scope.fav_prev_button = false;
 	$scope.favoritesTable = false;
 	$scope.emptyFavorites = true;
 	$scope.favoritesPageNum = 0;
	$scope.category = $scope.categorys[0];
	$scope.mapFrom_default = "Your Location";
	$scope.rowColor = [];
	$scope.highlightRow = false;

	$scope.clearForm = function(){
		document.getElementById('myForm').reset();
		$scope.nearbySearch = null;
		$scope.resultsTable = false;
		$scope.detailTab = false;
		$scope.detailsTable = false;
		$scope.emptyFavorites = false;
		$scope.emptyYelp = false;
		$scope.emptyPhotos = false;
		$scope.emptyGoogle = false;
		$scope.pills = false;
		$scope.next_button = false;
		$scope.previous_button = false;
	}


	$scope.addFavorites = function(row, index){
		console.log("row", row);
		console.log("index", index);	
		$scope.retrieveFavorites();
		console.log("what does $scope.favorites contains", $scope.favorites);
    	containsIndex = -1;
    	for (var i = 0; i < $scope.favorites.length; i++) {
			if($scope.favorites[i].place_id == row.place_id)
				containsIndex = i;
		};
		console.log("containsIndex", containsIndex);
    	if(containsIndex == -1) {
    		$scope.favorites.push(row);
			$scope.saveInLocalStorage();
    	} else {
    		 $scope.deleteFavorites(row);
    	}

    	$scope.showHideFavorites();
    	console.log("$scope.favorites", $scope.favorites);
		$scope.changeFav(row, index);
	}

	$scope.changeFav = function(row, index){
		console.log("changeFav");
		$scope.retrieveFavorites();
		fav = false;
		if(row != null){
			for (var i = 0; i < $scope.favorites.length; i++) {
			// 	$scope.favorites[i]
			// }
				if($scope.favorites[i].place_id == row.place_id){
					fav = true;
					console.log("fav is trueeeee");
				}
			}
		}

		if (index == 99){
			for (var i = 0; i < $scope.nearbySearch.results.length; i++){
				if($scope.nearbySearch.results[i].place_id == row.place_id){
					if(fav){
						$scope.rowColor[i] = "fa fa-star";
					}
					else{
						$scope.rowColor[i] = "fa fa-star-o";
					}
				}
			}
		}

		if(fav){
			$scope.rowColor[index] = "fa fa-star";
		}
		else{
			$scope.rowColor[index] = "fa fa-star-o";
		}

		console.log("rowColor", $scope.rowColor);
	}

	$scope.showHideFavorites = function(){
		if($scope.favorites.length >0){
    		$scope.emptyFavorites=false;
	      	$scope.favoritesTable=true;
    	}
    	else{
    		$scope.emptyFavorites=true;
	      	$scope.favoritesTable=false;
    	}
	}

	$scope.retrieveFavorites = function(){
    	$scope.favorites = [];
    	var favorites = angular.fromJson( localStorage.getItem( 'favorites' ) );
	    if ( favorites && favorites.length > 0) {
	      for (var i = 0; i < favorites.length; i++) {
	          $scope.favorites.push(favorites[i]);
	      }
		} else {
			$scope.favoritesTable = false;
			$scope.emptyFavorites = true;
		}
		console.log("retrieve:", $scope.favorites);
		//$scope.changeFav();
    }

    $scope.deleteFavorites = function(row){
    	var index = $scope.favorites.indexOf(row);
  		$scope.favorites.splice(index, 1);    
  		$scope.saveInLocalStorage();

  		for (var i = 0; i < $scope.nearbySearch.results.length; i++) {
			if($scope.nearbySearch.results[i].place_id == row.place_id)
				containsIndex = i;
		};

  		$scope.changeFav(row, containsIndex);
    }

    $scope.saveInLocalStorage = function(){
    	localStorage.setItem('favorites', angular.toJson($scope.favorites));
    }

	$scope.showPano = function(){
		var toggle = panorama.getVisible();
        if (toggle == false) {
          panorama.setVisible(true);
          document.getElementById("panoImg").setAttribute('src', 'http://cs-server.usc.edu:45678/hw/hw8/images/Map.png');
        } else {
          panorama.setVisible(false);
          document.getElementById("panoImg").setAttribute('src', 'http://cs-server.usc.edu:45678/hw/hw8/images/Pegman.png');
        }
	}

	function calculateAndDisplayRoute(directionsService, directionsDisplay) {
		/*var start = $scope.mapFromLocation;
		var end = $scope.infoTabDetails.formatted_address;*/
		directionsService.route({
			origin: {lat: $scope.mapLat, lng: $scope.mapLon},
			destination: {lat: $scope.placeDetail.geometry.location.lat(), lng: $scope.placeDetail.geometry.location.lng()},
			travelMode: $scope.mapMode,
			provideRouteAlternatives : true
		}, function(response, status) {
		if (status === 'OK') {
	  		directionsDisplay.setDirections(response);
		} else {
	  		window.alert('Directions request failed due to ' + status);
		}
		});
	}

	$scope.showMaps = function(){
		marker.setMap(null);
		if($scope.mapFrom_default == "Your Location" || $scope.mapFrom_default == "My Location"){
			$scope.mapLat = hereLat;
			$scope.mapLon = hereLon;
	    	calculateAndDisplayRoute(directionsService, directionsDisplay);
	    }else {
	    	console.log("else statement", $scope.mapFrom_default);
	    	$http.get("api/geocode/json?address="+window.encodeURIComponent($scope.mapFrom_default)+"&key=AIzaSyCAfmTpgd6WwFhP1V8W0Ehh8vFfPYmzB3A")
			.success(function(data) {
				console.log("success", data);
				var result = data;
				$scope.mapLat = result.results[0].geometry.location.lat;
				$scope.mapLon = result.results[0].geometry.location.lng;
				calculateAndDisplayRoute(directionsService, directionsDisplay);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	    }
		
	};
	$scope.googleYelpChange = function(){
		console.log("googleYelpChange", $scope.gY);
		if($scope.gY == "yelp-reviews" && $scope.yelpId != undefined){
			$scope.showYelp = true;
			$scope.showGoogle = false;
		}
		else if($scope.gY == "yelp-reviews" && $scope.yelpId == undefined){
			$scope.showYelp = false;
			$scope.showGoogle = false;
			$scope.emptyYelp = true;
			$scope.emptyGoogle = false;
		}
		else {
			$scope.showYelp = false;
			if($scope.placeDetail.reviews){
				$scope.showGoogle = true;
			}
			else{
				$scope.emptyGoogle = true;
			}
			$scope.emptyYelp = false;
		}
		console.log("yelpReviews", $scope.yelpReviews.reviews);
		for(var i = 0; i < $scope.yelpReviews.reviews.length; i++){
			console.log(i);
			jQuery('#rateYoYelp'+i).rateYo({rating : $scope.yelpReviews.reviews[i].rating, readOnly: true, normalFill: "transparent"});
		}

	}


	$scope.googleYelp = function(){
		//console.log("googleYelp", $scope.gY);
		//https://api.yelp.com/v3/businesses/matches/best?name=Tutor Hall Cafe&city=Los Angeles&state=CA&country=US&address1=3710 McClintock Avenue&
		//header: Bearer 4Hblzl5a7cN21wW198TpxfFvYhCf8W4TLjztWvr3FIw_O4r1hAJcgbXu-DMX28xTFKtpkWp8mG8bx1lj8PkrjIKf3c1eCteUq3rRrUWwWxuxtxWazMiY3L9GO0DEWnYx
		
		var name = $scope.placeDetail.name;
		var city = "";
		var state = "";
		var country = "";
		var route = "";
		var street_number = "";
		//console.log($scope.placeDetail.address_components);
		//console.log($scope.placeDetail.address_components.length);
		for(var i = 0; i < $scope.placeDetail.address_components.length; i++){
			//console.log($scope.placeDetail.address_components[i]);
			var component = $scope.placeDetail.address_components[i];

			for(var inner=0; inner<component.types.length; inner++){
				if(component.types[inner] == "locality"){
					city = component.long_name;
					//console.log("city" ,city);
				}
				else if(component.types[inner] == 'administrative_area_level_1'){
					state = component.short_name;
					//console.log("state", state);
				}
				else if(component.types[inner] == 'country'){
					country = component.short_name;
					//console.log("country ", country);
				}
				else if(component.types[inner] == 'route'){
					route = component.long_name;
				}
				else if(component.types[inner] == 'street_number'){
					street_number = component.short_name;
				}
			}
		}
		var address1 = street_number + " " + route;
		//console.log("address1", address1);
		//console.log("name", name);
		var url = "/yelp-id/?name="+name+"&city="+city+"&state="+state+"&country="+country+"&address1="+address1+"&";
		//console.log("url", url);
		$http.get(url)
			.success(function(data){
				console.log(data);
				$scope.yelpJson = data;
				console.log("$scope.yelpJson", $scope.yelpJson);
				if($scope.yelpJson.businesses[0]){
					console.log("id", $scope.yelpJson.businesses[0].id);
					$scope.yelpId = $scope.yelpJson.businesses[0].id;
					$scope.callYelpReviews();
				}
				else{
					$scope.yelpId = undefined;
					console.log($scope.yelpId);
				}
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	}

	$scope.callYelpReviews = function(){
		var url = "/yelp-reviews/?id="+$scope.yelpId;
		console.log("url", url);
		$http.get(url)
			.success(function(data){
				//console.log("reviews: ", data);
				$scope.yelpReviews = data;
				console.log("reviews", $scope.yelpReviews);
				for(var i=0; i < $scope.yelpReviews.reviews.length; i++){
		    		jQuery('#rateYoYelp'+i).rateYo({rating : $scope.yelpReviews.reviews[i].rating});
		    		jQuery('#rateYoYelp'+i).rateYo("option", "readOnly", true);
		    		jQuery('#rateYoYelp'+i).rateYo("option", "normalFill", "transparent");
		    		console.log($scope.yelpReviews.reviews[i].rating);
		    	//console.log("setting stars google: ", jQuery('#rateYo'+i).rateYo({rating : place.reviews[i].rating}));
		   		}
			})
			.error(function(data){
				console.log("Error: " + data);
			})
	}



	$scope.filterChange = function(){
		console.log($scope.filter);
		if($scope.gY == 'google-reviews'){
			if($scope.filter == 'default-order'){
				$scope.filterVal = "";
			}
			else if($scope.filter == 'highest-rating'){
				$scope.filterVal = "rating";
				$scope.reverse = true;
			}
			else if($scope.filter == 'lowest-rating'){
				$scope.filterVal = "rating";
				$scope.reverse = false;
			}
			else if($scope.filter == 'most-recent'){
				$scope.filterVal = "time";
				$scope.reverse = true;
			}
			else if($scope.filter == 'least-recent'){
				$scope.filterVal = "time";
				$scope.reverse = false;
			}
		}
		else{
			if($scope.filter == 'default-order'){
				$scope.filterVal = "";
			}
			else if($scope.filter == 'highest-rating'){
				$scope.filterVal = "rating";
				$scope.reverse = true;
			}
			else if($scope.filter == 'lowest-rating'){
				$scope.filterVal = "rating";
				$scope.reverse = false;
			}
			else if($scope.filter == 'most-recent'){
				$scope.filterVal = "time_created";
				$scope.reverse = true;
			}
			else if($scope.filter == 'least-recent'){
				$scope.filterVal = "time_created";
				$scope.reverse = false;
			}
		}
		//console.log("reviews_array sorted: ", $scope.reviews_array);
	}

	$scope.backButton = function(){
		$scope.resultsTable = true;
		$scope.favoritesTable = true;
		$scope.detailsTable = false;
		if($scope.nearbySearch.next_page_token != undefined){
			$scope.next_button = true;
		}
		else{
			$scope.next_button = false;
		}
		console.log("BackButton", $scope.offset);
		if($scope.offset > 0){
			$scope.previous_button = true;	
		}
		else{
			$scope.previous_button = false;
		}
		$scope.detailTab = false;
		$scope.pills = true;		
	}

	$scope.details = function(name, place_id, lat, lng, row){
		console.log(name, place_id, lat, lng);
		$scope.resultsTable = false;
		$scope.favoritesTable = false;
		$scope.emptyFavorites = false;
		$scope.detailsTable = true;
		$scope.next_button = false;
		$scope.previous_button = false;	
		$scope.detailTab = true;
		$scope.pills = true;
		$scope.highlightRow = row;
		$scope.changeFav(row, 99);
		var request = {
	  		placeId: place_id
		};

		var photoJS0 = [];
		var photoJS1 = [];
		var photoJS2 = [];
		var photoJS3 = [];

		service = new google.maps.places.PlacesService(map);
		service.getDetails(request, callback);

		function callback(place, status) {
		  if (status == google.maps.places.PlacesServiceStatus.OK) {
		    //createMarker(place);
		    console.log("place" ,place);
		    placeJS = place;
		    //console.log(placeJS.formatted_address);
		    //console.log(placeJS.international_phone_number);
		    
		    //document.getElementById('rating').innerText = placeJS.rating;
		    
		    var scope = angular.element(document.getElementById('keyword')).scope();
		    if(placeJS.photos){
		    	scope.emptyPhotos = false;
		    	scope.showPhotos = true;
		    	scope.$apply();
			    for(var i=0; i<placeJS.photos.length; i++){
			    	//console.log(placeJS.photos[i].getUrl({'maxWidth': 1600, 'maxHeight':800}));
			    	//$scope.photoArray.push(placeJS.photos[i].getUrl({'maxWidth':1600, 'maxHeight':800}));
			    	if(i % 4 == 0){
			    		photoJS0.push((placeJS.photos[i].getUrl({'maxWidth': 1600, 'maxHeight':800})));
			    	}
			    	else if(i%4 == 1){
			    		photoJS1.push((placeJS.photos[i].getUrl({'maxWidth': 1600, 'maxHeight':800})));
			    	}
			    	else if(i%4==2){
			    		photoJS2.push((placeJS.photos[i].getUrl({'maxWidth': 1600, 'maxHeight':800})));
			    	}
			    	else if (i%4 == 3){
			    		photoJS3.push(((placeJS.photos[i].getUrl({'maxWidth': 1600, 'maxHeight':800}))));
			    	}
			    	//photoJS.push(placeJS.photos[i].getUrl({'maxWidth': 1600, 'maxHeight':800}));
			    }
		    }
		    else{
		    	scope.emptyPhotos = true;
		    	scope.showPhotos = false;
		    	scope.$apply();
		    }

		    if(placeJS.reviews){
		    	scope.showGoogle = true;
		    	scope.emptyGoogle = false;
		    	scope.$apply();
		    	reviewJS = [];
			    for(var i=0; i < placeJS.reviews.length; i++){
			    	//console.log("typeOf reviews_array", typeof($scope.reviews_array));
			    	//$scope.reviews_array.push(placeJS.reviews[i]);
			    	//console.log(placeJS.reviews[i].time);
			    	var date = new Date(placeJS.reviews[i].time*1000);
			    	var hours = date.getHours();
			    	var minutes = "0" + date.getMinutes();
			    	var seconds = "0" + date.getSeconds();
			    	var formattedTime = date.getUTCFullYear() + "-" + (date.getUTCMonth()+1) + "-" + date.getUTCDate() + " " + hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
			    	//console.log("formattedTime", formattedTime);
			    	//console.log(date.getUTCMonth()+1, date.getUTCDate(), date.getUTCFullYear());
			    	placeJS.reviews[i].formattedTime = formattedTime;
			    	//console.log(placeJS.reviews[i]);

			    	//console.log(date);
			    	reviewJS.push(placeJS.reviews[i]);
			    	//console.log(typeof([placeJS.reviews]));
			    }
		    }
		    else{
		    	scope.showGoogle = false;
		    	scope.emptyGoogle = true;
		    }

		    var scope = angular.element(document.getElementById('keyword')).scope();
		    //console.log("photoJS", photoJS);
		    scope.photoArray0 = photoJS0;
		    scope.photoArray1 = photoJS1;
		    scope.photoArray2 = photoJS2;
		    scope.photoArray3 = photoJS3;
		    scope.placeDetail = place;
		    scope.reviews_array = reviewJS;
		    scope.destinationTo = place.name + ", " + place.formatted_address;
		    scope.hoursArray=[];
		    scope.$apply();
		    console.log("placeDetail:", $scope.placeDetail, $scope.placeDetail.geometry.location.lat());

		    if(placeJS.formatted_address){
		    	document.getElementById('formatted_address').innerText = placeJS.formatted_address;
		    }
		    if(placeJS.international_phone_number){
		    	document.getElementById('phone_number').innerText = placeJS.international_phone_number;
		    }
		    if(placeJS.price_level){
		    	document.getElementById('price_level').innerText = placeJS.price_level;
		    }

		    //console.log("placeJS.rating", placeJS.rating);
		    if(placeJS.rating){
		    	$("#rateYo").rateYo({rating: 3.6});
			    jQuery('#rateYo').rateYo("option", "normalFill", "transparent");
			    jQuery('#rateYo').rateYo("option", "rating", placeJS.rating);
			    jQuery('#rateYo').rateYo("option", "readOnly", true);
		    }

		    //console.log('rateyo:', $("#rateYo").rateYo("option", "rating", 5));
		    if(placeJS.url){
		    	document.getElementById('page').innerHTML = "<a href="+placeJS.url+" target='_blank'>"+ placeJS.url +"</a>";
		    }
		    if(placeJS.website){
		    	document.getElementById('website').innerHTML = "<a href="+placeJS.website+" target='_blank'>"+placeJS.website+"</a>";
		    }

		    if(placeJS.opening_hours){
			    day = moment().utcOffset($scope.placeDetail.utc_offset).format('E');

			    console.log(day, typeof(day));
			    console.log($scope.placeDetail.opening_hours.weekday_text[day]);
			    var index = Number(day);
			    for(var i = 0; i < 7; i++){
			    	if (index >= 7){
			    		index = 0;
			    	}
			    	$scope.hoursArray.push($scope.placeDetail.opening_hours.weekday_text[index]);
			    	index++;
			    }
			    console.log("hoursArray:", $scope.hoursArray);
			    if($scope.placeDetail.opening_hours.open_now){
			    	document.getElementById('hours').innerHTML="<p> Open now: " + $scope.placeDetail.opening_hours.weekday_text[day] + '     <a data-toggle="modal" data-target="#exampleModal">Daily Open Hours.</a>'+"</p>";
			    }
			    //<div data-toggle="modal" data-target="#exampleModal">Clickable content, graphics, whatever</div>
			    else{
			    	document.getElementById('hours').innerHTML="<p> Closed" + '     <a data-toggle="modal" data-target="#exampleModal">Daily Open Hours.</a>'+"</p>";	
			    }
			    //document.getElementById('hours').innerText=$scope.placeDetail.opening_hours.weekday_text[day];
		    }
		   	
		    destinationLat = $scope.placeDetail.geometry.location.lat();
		    destinationLon = $scope.placeDetail.geometry.location.lng();
		    scope.googleYelp();
		    //console.log("rateYo#", document.getElementById("rateYo0"));
		    if(place.reviews){
			    for(var i=0; i < place.reviews.length; i++){
			    	jQuery('#rateYo'+i).rateYo({rating : place.reviews[i].rating});
			    	jQuery('#rateYo'+i).rateYo("option", "normalFill", "transparent");
			    	jQuery('#rateYo'+i).rateYo("option", "rating", place.reviews[i].rating);
			    	jQuery('#rateYo'+i).rateYo("option", "readOnly", true);
			    }
		    }
		    $scope.tweet="https://twitter.com/intent/tweet?text=Check out "+$scope.placeDetail.name+ " located at "+$scope.placeDetail.formatted_address+" Website: " +"&url="+ $scope.placeDetail.website + "&hashtags=" +encodeURIComponent('TravelAndEntertainmentSearch');
		    console.log("twitter url", $scope.tweet);
		    	
		    //console.log("$scope.photoArray: ", $scope.photoArray);
		  }
		}
		//console.log("Outside the javascript function.photoArray: ", $scope.photoArray);
		//$scope.place = placeJS;
		//console.log("scope.place: ", $scope.place);
		
	}
	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		console.log("inside main createTodo");
		$http.post('/api/todos/', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		console.log("inside main deleteTodo");
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.ipApiJson = function() {
		console.log("inside ipApiJson");
		$http.get('/ip-api/')
			.success(function(data) {
				$scope.todos = data;
				console.log(data);
				// console.log(data.data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}

	$scope.submitForm = function(){
		$scope.detailTab=false;
		$scope.pbar=false;
		$scope.resultsTable=false;
		$scope.pills = false;
		$scope.next_button = false;
		$scope.previous_button = false;
		$scope.nearbySearch = null;
		console.log("inside submitForm");
		console.log($scope.keyword);
		console.log($scope.category, $scope.category.value);
		if($scope.distance == undefined){
			console.log("undefined 10");
			$scope.distance = 10;
		}
		console.log($scope.distance);
		var radius = $scope.distance * 1609.344;
		console.log("radius", radius);
		console.log("lat lon: " , lat, lon);
		console.log('from', $scope.from);
		if($scope.from == 'other'){
			//console.log('test: ', document.getElementById('different-location').value);
			var other = document.getElementById('different-location').value;
			$scope.mapFrom_default = other;
			other = other.trim();
			other = other.replace(' ', '+');
			//console.log("other: ", other);
			var api_key = 'AIzaSyDfJRYMqy1skTG4zPbBhhQBNF0ngnDLEUI';
			var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+other+'&key='+api_key;
			//console.log(url);
			$http.get(url)
				.success(function(data){
					$scope.todos=data;
					console.log("data", data);
					lat = data['results'][0]['geometry']['location']['lat'];
					lon = data['results'][0]['geometry']['location']['lng'];
					var url = "/search-nearby/?lat="+lat+"&lon="+lon+"&mile="+$scope.distance+"&type="+$scope.category.value+"&keyword="+$scope.keyword;
					$http.get(url)
						.success(function(data){
							//console.log(data);
							$scope.nearbySearch = data;
							for (var i = 0; i < $scope.nearbySearch.length; i++) {
								$scope.changeFav($scope.nearbySearch[i],i+1);
							}
							if($scope.nearbySearch.results.length <= 0){
								$scope.emptySearch = true;
								$scope.pills = false;
							}
							else{
								$scope.emptySearch= false;
								$scope.pills = true;
							}
							console.log($scope.nearbySearch);
							console.log("next_page: ", $scope.nearbySearch.next_page_token);
							$scope.pbar=true;
							$scope.resultsTable = true;
							//$scope.pills = true;
							//if next_page_token != undefined show a next page button?
							if($scope.nearbySearch.next_page_token != undefined){
								$scope.next_button = true;
							}
							$scope.retrieveFavorites();
							if($scope.favorites.length>0){
								$scope.favoritesTable = true;
								$scope.emptyFavorites = false;
							}
						})
						.error(function(data){
							console.log('Error: ' + data);
						});	
				})
				.error(function(data){
					console.log('Error: ' + data);
				});
			console.log('lat lon from other: ', lat, lon);
		}
		/*nearbySearchCall*/
		else{
			var url = "/search-nearby/?lat="+lat+"&lon="+lon+"&mile="+$scope.distance+"&type="+$scope.category.value+"&keyword="+$scope.keyword;
			console.log("nearbySearch: ", url);
			$http.get(url)
				.success(function(data){
					//console.log(data);
					$scope.nearbySearch = data;
					if($scope.nearbySearch.results.length <= 0){
						$scope.emptySearch = true;
						$scope.pills = false;
					}
					else{
						$scope.emptySearch= false;
						$scope.pills = true;
					}
					console.log($scope.nearbySearch);
					console.log("next_page: ", $scope.nearbySearch.next_page_token);
					$scope.pbar=true;
					$scope.resultsTable = true;
					//$scope.pills = true;
					//if next_page_token != undefined show a next page button?
					if($scope.nearbySearch.next_page_token != undefined){
						$scope.next_button = true;
					}
					$scope.retrieveFavorites();
					if($scope.favorites.length>0){
						$scope.favoritesTable = true;
						$scope.emptyFavorites = false;
					}
				})
				.error(function(data){
					console.log('Error: ' + data);
				});	
		}
			

	}
	$scope.nextPage = function(next_page_token){
		//console.log(next_page_token);
		//https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=????&key=AIzaSyCAfmTpgd6WwFhP1V8W0Ehh8vFfPYmzB3A
		var key = $scope.offset;
		//console.log("key", key);
		history[key]= $scope.nearbySearch;
		//console.log("value: ", history[key]);
		//console.log("history", history);
		var url = "/search-next/?next="+next_page_token;
		$scope.next_button = false;
		$scope.offset = $scope.offset + 1;
		//console.log("nextPage URL", url);
		$http.get(url)
			.success(function(data){
				//console.log(data);
				$scope.nearbySearch = data;
				$scope.previous_button = true;
				console.log("next: ", $scope.nearbySearch);
				if($scope.nearbySearch.next_page_token != undefined){
					$scope.next_button = true;
				}
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	}
	$scope.previousPage = function(){
		$scope.offset = $scope.offset -1;
		var key = $scope.offset;
		if(key == 0){
			$scope.previous_button = false;
		}
		$scope.nearbySearch = history[key];
		if($scope.nearbySearch.next_page_token != undefined){
			$scope.next_button = true;
		}
	}

}
