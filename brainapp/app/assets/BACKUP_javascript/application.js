// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

/* // APPLICATION.JS CODE START HERE // */

//(function() {
function initApp(){

  /* ACTUAL APP CODE START */
  
  /* // Vars definitions START // */
  /* the 'main' variables are defined below */
  var ajaxSearchInputField = document.getElementById('ajax-search-input'); // the input field wich has a 'onkeyup' event attached to it
  var searchResultsDiv = document.getElementById('app-search-results'); // the div wich get its content changed when the responseText of an ajax ( xhr ) request to the Rails server is received (..)
  var ajaxSearchKeyUpDelay = 1000; // the delay of the 'timed-Out-Fcn-Call' that initiates the ajax ( xhr ) request to the Rails server
  var ajaxSearchTimer = 0; // the 'ajaxSearchTimer' timer, wich will be used for the 'ajax autocomplete search', is set to 0 for further if/else logic (..)
  var railsJsonpSearchCallbackFcn = 'sayBla'; // Fcn defined directly in 'application.html.erb' to handle the received 'railsjsonpSearchData' (..)
  var railsJsonpSearchPath = 'http://stephaneagmacbookpro.local:3000/ajaxsearch.js?callback=' + railsJsonpSearchCallbackFcn + '&lookingfor='; // same as just below, but using above variable for more flexibility / easier access (..)
  //var railsJsonpSearchPath = 'http://stephaneagmacbookpro.local:3000/ajaxsearch.js?callback=sayBla&lookingfor='; // <(..)>ajaxsearch.js > that's the way we handle the 'respond_to jsonp' in Rails's home_controller#ajaxsearch (..)
  // also, the path includes the Fcn that 'll get called once the request response is loaded ( > in the current implm, the 'callback Fcn' is 'sayBla()', and is defined in the 'application.html.erb' file directly (..) )
  var railsAjaxSearchPath = 'http://stephaneAGmacbookpro.local:3000/ajaxsearch?lookingfor=';
  //var railsAjaxSearchPath = 'http://localhost:3000/ajaxsearch?lookingfor='; // path used in Rails to get the passed params ( > the route is set to 'home#ajaxsearch', and definiton of 'ajaxsearch' in home_controller param 'lookingfor')
  
  
  /* // Vars definitions END // */
  
  /* // Fcns definitions START // */
  /* all the functions are defined below */
  
  // hello world fcn
  function sayHello(){
	alert("hello there!");
  }
  
  function logHello(){
	console.log("Hello there!");
  }
  
  // Fcn that gets called each time an 'onkeyup' events happend on the 'ajax-search-input' field (..)
  function ajaxAutoCompleteSearchHandler(){
  	// WIP LOG
  	console.log('ajaxAutoCompleteSearchHandler invoked: a keyup event just occured ..');
  	
  	// check if the input field is empty or not
  	var ajaxSearchData = ajaxSearchInputField.value; // the current value of the input field wich has an 'onkeyup' event attached to it (..)
  	if( ajaxSearchData == "" ){ // the input text field is currently empty (> hold no text entered by the user (..) )
  		// WIP LOG
  		console.log('ajaxSearchData (the input text field) is currently empty ..');
  		// call a Fcn that will apply CSS classes to animate the 'searchResults' div, sliding it down & fading it off
  		// call a Fcn that will cancel any already-running 'setTimed-Out-Fcn', if any (..)
  		clearAjaxTimeout();
  	} else { // the text field is not empty ( > holds search criterias entered by the user )
  		// WIP LOG
  		console.log('ajaxSearchData (the input text field) is currently NOT empty ..');
  		// call a Fcn that will CANCEL any already-running 'setTimed-Out-Fcn', if any (..)
  		clearAjaxTimeout();
  		// call a Fcn that will actually SET a 'time-Out' ( > wich, once 'timed-Out', will itself call a Fcn that actually performs the ajax request using xhr (..)  )
  		setAjaxTimeout();
  	}
  }
  
  // Fcn that gets called each time we need to RESET the 'timed-Out-Fcn-Call' that actually initiates the ajax ( xhr ) request to the server (..)
  function clearAjaxTimeout(){
  	// WIP LOG
  	console.log('clearAjaxTimeout Fcn executed ..');
  	// check if the 'ajaxSearchTimer' is currently running, and if so, CANCEL it & RESET it ( > 'RESET' ~> set its value to 0 (..) )
  	if( ajaxSearchTimer != 0 ){ // other than '0' ( > the timer is 'in use' (..) )
  		// WIP LOG
  		console.log('a timer was running ..');
  		clearTimeout( ajaxSearchTimer ); // clear/cancel/abort the 'ajaxSearchTimer' ( > "The one you prefer ;p" )
  		ajaxSearchTimer = 0; // reset the 'ajaxSearchTimer'
  		// WIP LOG
  		console.log('.. and was just reset ..');
  	} else if( ajaxSearchTimer == 0 ) { // equals '0' ( > the timer was not running (..) )
  		// WIP LOG
  		console.log('no timer were running ..');
  	} else {
  		// WIP LOG
  		console.log('WTF ???! ..');
  	}
  }
  
  // Fcn that gets called each time we need to SET the 'timed-Out-Fcn-Call' that actually initiates the ajax ( xhr ) request to the server (..) 
  function setAjaxTimeout(){
  	// WIP LOG
  	console.log('setAjaxTimeout Fcn executed ..');
  	// use the 'ajaxSearchTimer' to delay the execution of our ajax ( xhr ) request to the Rails server
  	//ajaxSearchTimer = setTimeout( function(){ delayedAutoCompleteSearch(); }, ajaxSearchKeyUpDelay );
  	ajaxSearchTimer = setTimeout( function(){ console.log('timer timed out: calling "delayedAutoCompleteSearch()" Fcn '); delayedAutoCompleteSearchUsingJSONP(); }, ajaxSearchKeyUpDelay ); // same as below, but using JSONP (> for cross dom's)
  	//ajaxSearchTimer = setTimeout( function(){ console.log('timer timed out: calling "delayedAutoCompleteSearch()" Fcn '); delayedAutoCompleteSearch(); }, ajaxSearchKeyUpDelay ); // set the function that will get called after the 'ajaxSearchKeyUpDelay' has timed-Out without being cancelled/cleared/aborted (..)
  	// WIP LOG
  	console.log('a timer was just set ..'); 
  }
  
  /* Fcn that makes use of the "<script id="rails-jsonp-search" src=""> </script>" to perform a JSONP request to the Rails server */
  function delayedAutoCompleteSearchUsingJSONP(){
  	// WIP LOG
  	console.log('delayedAutoCompleteSearchUsingJSONP Fcn executed ..');
  	
  	// get the search criterias entered by the user ( > represented by the value held by the 'ajaxSearchInputField' )
  	var ajaxSearchData = ajaxSearchInputField.value; // the current value of the input field wich has an 'onkeyup' event attached to it (..)
  	// WIP trickery :/
  	//ajaxSearchData = 'Rails';
  	/* setup a "<script id="rails-jsonp-ajax-search" src="(..)"> </script> " to send the query to the Rails server and got it calling the '' defined as 'callback Fcn' in our URL & [Rails-]server side ;p */
  	var railsJsonpScript = document.createElement('script'); // create a <script> tag
  	railsJsonpScript.id = 'rails-jsonp-search-script'; // give it an id
  	railsJsonpScript.type = 'text/javascript'; // set its type
  	
  	// var railsAjaxSearchPath = 'http://localhost:3000/ajaxsearch?lookingfor='; /* [ MOVED UPWARDS FOR EASIER ACCESS (..) ] */
  	// create the path we 'll use to make the JSONP request
  	var jsonpSearchPath = railsJsonpSearchPath + ajaxSearchData; // append the content of the input text field parameters, to form a new 'path' used to query the Rails server
  	// setup the src of the 'railsJsonpScript' to fit our needs (..)
  	railsJsonpScript.src = jsonpSearchPath;
  	// the Fcn/code to be called once a response is received from the Rails server is actually passed as 'callback' parameter to the Rails server
  	// var railsJsonpSearchPath = 'http://stephaneagmacbookpro.local:3000/ajaxsearch.js?callback=sayBla&lookingfor='; // simpliest form of the path (> not containing variables for parameters such as callback Fcn (..) )
  	
  	// actually send the JSONP request to the Rails server ( the Fcn passed as 'callback' parameter 'll get called once it has loaded)
  	document.getElementsByTagName("head")[0].appendChild(railsJsonpScript); 
  	
  }
  
  // Fcn that gets called once a request to the Rails sever initiated by the above Fcn is received & loaded ( as it's its load that triggers the Fcn call (..) ) > seems that it can't get executed from the page (at least by now..)
  function jsonpSearchQueryResultsFromRails(theDataFromRails){
  	console.log('jsonpSearchQueryResultsFromRails Fcn executed ..');
	//console.log(theDataFromRails);
	// dumb tests
	console.log( theDataFromRails[0].title ); // yup ! ;p
	for (i=0; i < theDataFromRails.length; i++){
		console.log( '------------------------------------  Post Start ------------------------------------' );
		console.log('Post name: ' + theDataFromRails[i].name );
		console.log('Post title: ' + theDataFromRails[i].title );
		console.log('Post techs: ' + theDataFromRails[i].techs );
		console.log('Post sources: ' + theDataFromRails[i].sources );
		console.log('Post content: ' + theDataFromRails[i].content );
		console.log('Post creation date: ' + theDataFromRails[i].created_at );
		console.log( '------------------------------------  Post End ------------------------------------' );
	}
	
	// cleanup of the <script> element
	var railsJsonpUsedScript = document.getElementById('rails-jsonp-search-script');
	// remove it from the head
	document.getElementsByTagName("head")[0].removeChild(railsJsonpUsedScript);
	// delete it (> digg the pros/cons (..) )
	delete railsJsonpUsedScript;
	
  }
  
  // Fcn that ACTUALLY INITIATES THE AJAX ( XHR ) REQUEST to the Rails server (..)
  function delayedAutoCompleteSearch(){
  	// WIP LOG
  	console.log('delayedAutoCompleteSearch Fcn executed ..');
  	
  	// get the search criterias entered by the user ( > represented by the value held by the 'ajaxSearchInputField' )
  	var ajaxSearchData = ajaxSearchInputField.value; // the current value of the input field wich has an 'onkeyup' event attached to it (..)
  	// WIP trickery :/
  	//ajaxSearchData = 'Rails';
  	// setup an XMLHttpRequest ( xhr ) to send the query to the Rails server and get the response to append it in the page in an 'ajaxy-way' ;p
  	var xhr = new XMLHttpRequest(); // we create a new xhr object
  	// var railsAjaxSearchPath = 'http://localhost:3000/ajaxsearch?lookingfor='; /* [ MOVED UPWARDS FOR EASIER ACCESS (..) ] */
  	// create the path we 'll use to make the ajax ( xhr ) request
  	var ajaxSearchPath = railsAjaxSearchPath + ajaxSearchData; // append the content of the input text field parameters, to form a new 'path' used to query the Rails server
  	// configure the request to fit our needs (..)
  	xhr.open("GET", ajaxSearchPath, true); // configure the XMLHttpRequest ( > IMPORTANT : the last parameter ("I think I remember" (..) stands for ASYNCHRONOUS requests ( ~non-blocking (..) ) ) )
  	// define the Fcn/code to be called once a response is received from the Rails server
  	xhr.onreadystatechange = function(){ // we specify what to do when we actually receive data from the [above] request coming from the Rails server
  	// WIP LOG
  	console.log('xhr.onreadystatechange just called ..');
  		if( xhr.status == 200 && xhr.readyState == 4 ){ // if we did actually receive something without error
  		// WIP LOG
  		console.log('xhr.status == 200 && xhr.readyState == 4 just called ..');
  			if( xhr.responseText ){ // if what we received contains the 'well-known' responseText ( > the data, in html or json, rendered by the Rails server for us ;p)
  				// WIP LOG
  				console.log('xhr.responseText just called ..');
  				//console.log('xhr.responseText: ' + xhr.responseText);
  				
  				// call a Fcn that uses CSS animations to fade out the 'searchResultsDiv' if it was already visible to the user (..)
  				//var searchResultsDiv = document.getElementById('ajax-search-results'); /* [ MOVED UPWARDS FOR EASIER ACCESS (..) ] */
  				
  				/* WIP > get the content returned from the request */
  				var queryResultsHTMLContent = document.createElement('div'); // var that 'll hold the fetched content ( > it's a DOM element, created, but not added to the DOM )
  				queryResultsHTMLContent.innerHTML = xhr.responseText; // append the content of the 'responseText' ( > containing the results of our query for mthe Rails server ) to the freshly-created div 'queryResultsHTMLContent'
  				// WIP LOG
  				console.log('queryResultsHTMLContent content: ' + queryResultsHTMLContent.innerHTML);
  				
  				// digg a littl' bit through the fetched content to find the first div
  				var queryResultsDivs = queryResultsHTMLContent.getElementsByTagName('div'); // as the 'queryResultsHTMLContent' is a DOM element, we can use the DOM fcns on it ;p
  				console.log('queryResultsDivs contains ' + queryResultsDivs.length + 'elements');
  				//console.log('queryResultsDivs[0] contains ' + queryResultsDivs[0].innerHTML ); // contains ' <!-- div#app-header --> this is the App header '
  				//console.log('queryResultsDivs[1] contains ' + queryResultsDivs[1].innerHTML ); // contains ' <!-- div#app-search [ > 'logHello();' onkeyup works ] --> <input id="ajax-search-input" (..) > '
  				//console.log('queryResultsDivs[2] contains ' + queryResultsDivs[2].innerHTML ); // contains ' <!-- div#app-body --> (..)  '
  				//console.log('queryResultsDivs[3] contains ' + queryResultsDivs[3].innerHTML ); // contains ' div#app-content (..) '
  				console.log('queryResultsDivs[4] contains ' + queryResultsDivs[4].innerHTML ); // THE RIGHT ONE ;D
  				
  				// append the content of the 'responseText' ( > containing the results of our query for mthe Rails server ) to the 'searchResultsDiv' (..
  				//searchResultsDiv.innerHTML = 'Hello there !';
  				searchResultsDiv.innerHTML = queryResultsDivs[4].innerHTML; // get the fourth-DIV-found's inner HTML & use it as the innerHTML of our 'searchResultsDiv' (..)
  				
  				// call a Fcn that uses CSS animations to fade in the 'searchResultsDiv' if it was previously hidden to the user (..)  
  			} // end of 'if( xhr.responseText )' Fcn
  			// RE-INIT(S) HERE ( > in case of having elements loaded using ajax needing to have event listeners attached to them ( after an 'ajax page change' for example (..) ) )
  			// call a Fcn that will apply CSS classes to animate the 'searchResults' div, sliding it up & fading it in
  			
  			return true; // [ I'm quite sure I remember it's ] needed for the asynchronous request (..)
  		} // end of 'if( xhr.status == 200 && xhr.readyState == 4 )' fcn
  	}; // end of 'xhr.onreadystatechange = function()' Fcn
  	// actually send the request to the Rails server in an asynchronous manner ( > don't block while waiting the responseText that'll be received from the Rials server )
  	xhr.send(null); // use 'null' as parameter ( > necessary for the request to be asynchronous (..) )
  	// WIP LOG
  	console.log('XMLHttpRequest just sent ..');
  	
  	return false; // [ I'm quite sure I remember it's ] needed for the asynchronous request (..)
  }
  
  // Fcn to handle the click on the 'add code' button in the app/views/posts/_form.html.erb (..)
  function initAddCodeBtn(){
  	console.log('initAddCodeBtn executed.')
  	var addCodeBtn = document.getElementById('addCodeBtn');
  	if( typeof(addCodeBtn) != 'undefined' && addCodeBtn != null ){ // the button is present on the current page
  		console.log('addCodeBtn is present on the current page.')
  		var postContentTxtArea =  document.getElementById('post_content'); // get q reference to the post content text area
  		addCodeBtn.onmouseup = function(){ // and attach an event for each time to mouse click is released on it
  			postContentTxtArea.value += '\n<pre class="prettyprint">\n\n</pre>'; // add a '<pre class="prettprint"></pre>' to the text area, with space in it (..)
  		}
  	}
  }
  
  /* // Fcns definitions END // */
  
  /* // App Logic START // */
  /* the code that gets executed once loaded is below */
  
  // say Hello
  //sayHello();
  // log Hello
  logHello();
  
  // add keyup event listener to the search input text field (..)
  ajaxSearchInputField.onkeyup = function(){ 
  	console.log('Key up happend!');
  	ajaxAutoCompleteSearchHandler();
  }; // wip 'dummy test' ;p
  //ajaxSearchInputField.onkeyup = ajaxAutoCompleteSearchHandler();
  
  initAddCodeBtn();
  
  
  /* // App Logic END // */
  
  /* ACTUAL APP CODE END */

} // end 'function initApp()'
//})();

/* // APP JAVASCRIPT LOGIC INIT HERE //*/
window.onload = initApp;

/* // APPLICATION.JS CODE END HERE // */