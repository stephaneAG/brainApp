/* 
	brainApp_module.js - The actual Rails 'brainApp' as a javascript module, part of the 'neatFramework'
	by StephaneAG - 2013
 */

// Self_executing_Anonymous Fcn ( providing closure & preventing polluting the global namespace (..) )
// R: 'barebone syntax' : (function(){})(); 
	(function(theWindow, theDocument, theUndefined){
		var undef; // an undefined var
		// some 'closures' tests ..
		//console.log('[ brainApp_module.js ] theWindow == window ? : ' + ( theWindow == window ) ); // true
		//console.log('[ brainApp_module.js ] theDocument == document ? : ' + ( theDocument == document ) ); // true
		//console.log('[ brainApp_module.js ] theUndefined == "undefined" ? : ' + ( theUndefined == undef ) ); // true
		
		/* ************************************************************************************************************************************************ */
		// our actual module code .. ( in this particular case, the 'brainApp' overall logic (..) )
  
  		/* // Vars definitions START // */
  			/* the 'main' variables are defined below */
  			
  			var _ajaxSearchInputField = theDocument.getElementById('ajax-search-input'); // the input field wich has a 'onkeyup' event attached to it
  			var _searchResultsDiv = theDocument.getElementById('app-search-results'); // the div wich get its content changed when the responseText of an ajax ( xhr ) request to the Rails server is received (..)
  			var _ajaxSearchKeyUpDelay = 1000; // the delay of the 'timed-Out-Fcn-Call' that initiates the ajax ( xhr ) request to the Rails server
  			var _ajaxSearchTimer = 0; // the 'ajaxSearchTimer' timer, wich will be used for the 'ajax autocomplete search', is set to 0 for further if/else logic (..)
  			// BELOW NEED AN EDIT FOR RAILS
  			var _railsJsonpSearchCallbackFcn = 'neatFramework.brainApp_module_handleJSONPDataFromRails';
  			//var _railsJsonpSearchCallbackFcn = '_handleJSONPDataFromRails'; // Fcn defined directly in 'application.html.erb' to handle the received 'railsjsonpSearchData' (..)
  			var _railsJsonpSearchPath = 'http://stephaneagmacbookpro.local:3000/ajaxsearch.js?callback=' + _railsJsonpSearchCallbackFcn + '&lookingfor='; // same as just below, but using above variable for more flexibility / easier access (..)
  			//var railsJsonpSearchPath = 'http://stephaneagmacbookpro.local:3000/ajaxsearch.js?callback=sayBla&lookingfor='; // <(..)>ajaxsearch.js > that's the way we handle the 'respond_to jsonp' in Rails's home_controller#ajaxsearch (..)
  // also, the path includes the Fcn that 'll get called once the request response is loaded ( > in the current implm, the 'callback Fcn' is 'sayBla()', and is defined in the 'application.html.erb' file directly (..) )
  			var _railsAjaxSearchPath = 'http://stephaneAGmacbookpro.local:3000/ajaxsearch?lookingfor=';
  //var railsAjaxSearchPath = 'http://localhost:3000/ajaxsearch?lookingfor='; // path used in Rails to get the passed params ( > the route is set to 'home#ajaxsearch', and definiton of 'ajaxsearch' in home_controller param 'lookingfor')
  
  
  		/* // Vars definitions END // */
  		
  		/* // Fcns definitions START // */
  			/* all the functions are defined below */
  			
			// Fcn that gets called each time an 'onkeyup' events happend on the 'ajax-search-input' field (..)
  			function _ajaxAutoCompleteSearchHandler(){
  				// WIP LOG
  				console.log('ajaxAutoCompleteSearchHandler invoked: a keyup event just occured ..');
  				// check if the input field is empty or not
  				var ajaxSearchData = _ajaxSearchInputField.value; // the current value of the input field wich has an 'onkeyup' event attached to it (..)
  				if( ajaxSearchData == "" ){ // the input text field is currently empty (> hold no text entered by the user (..) )
  					// WIP LOG
  					console.log('ajaxSearchData (the input text field) is currently empty ..');
  					// call a Fcn that will apply CSS classes to animate the 'searchResults' div, sliding it down & fading it off
  					// call a Fcn that will cancel any already-running 'setTimed-Out-Fcn', if any (..)
  					_clearAjaxTimeout();
  				} else { // the text field is not empty ( > holds search criterias entered by the user )
  					// WIP LOG
  					console.log('ajaxSearchData (the input text field) is currently NOT empty ..');
  					// call a Fcn that will CANCEL any already-running 'setTimed-Out-Fcn', if any (..)
  					_clearAjaxTimeout();
  					// call a Fcn that will actually SET a 'time-Out' ( > wich, once 'timed-Out', will itself call a Fcn that actually performs the ajax request using xhr (..)  )
  					_setAjaxTimeout();
  				}
  			}
  			
  			// Fcn that gets called each time we need to RESET the 'timed-Out-Fcn-Call' that actually initiates the ajax ( xhr ) request to the server (..)
  			function _clearAjaxTimeout(){
  				// WIP LOG
  				console.log('clearAjaxTimeout Fcn executed ..');
  				// check if the 'ajaxSearchTimer' is currently running, and if so, CANCEL it & RESET it ( > 'RESET' ~> set its value to 0 (..) )
  				if( _ajaxSearchTimer != 0 ){ // other than '0' ( > the timer is 'in use' (..) )
  					// WIP LOG
  					console.log('a timer was running ..');
  					clearTimeout( _ajaxSearchTimer ); // clear/cancel/abort the 'ajaxSearchTimer' ( > "The one you prefer ;p" )
  					_ajaxSearchTimer = 0; // reset the 'ajaxSearchTimer'
  					// WIP LOG
  					console.log('.. and was just reset ..');
  				} else if( _ajaxSearchTimer == 0 ) { // equals '0' ( > the timer was not running (..) )
  					// WIP LOG
  					console.log('no timer were running ..');
  				} else {
  					// WIP LOG
  					console.log('WTF ???! ..');
  				}
  			}
  			
  			// Fcn that gets called each time we need to SET the 'timed-Out-Fcn-Call' that actually initiates the ajax ( xhr ) request to the server (..) 
  			function _setAjaxTimeout(){
  				// WIP LOG
  				console.log('setAjaxTimeout Fcn executed ..');
  				// use the 'ajaxSearchTimer' to delay the execution of our ajax ( xhr ) request to the Rails server
  				//ajaxSearchTimer = setTimeout( function(){ delayedAutoCompleteSearch(); }, ajaxSearchKeyUpDelay );
  				_ajaxSearchTimer = setTimeout( function(){ console.log('timer timed out: calling "delayedAutoCompleteSearch()" Fcn '); _delayedAutoCompleteSearchUsingJSONP(); }, _ajaxSearchKeyUpDelay ); // same as below, but using JSONP (> for cross dom's)
  				//ajaxSearchTimer = setTimeout( function(){ console.log('timer timed out: calling "delayedAutoCompleteSearch()" Fcn '); delayedAutoCompleteSearch(); }, ajaxSearchKeyUpDelay ); // set the function that will get called after the 'ajaxSearchKeyUpDelay' has timed-Out without being cancelled/cleared/aborted (..)
  				// WIP LOG
  				console.log('a timer was just set ..'); 
  			}
  			
  			/* Fcn that makes use of the "<script id="rails-jsonp-search" src=""> </script>" to perform a JSONP request to the Rails server */
  			function _delayedAutoCompleteSearchUsingJSONP(){
  				// WIP LOG
  				console.log('delayedAutoCompleteSearchUsingJSONP Fcn executed ..');
  	
  				// get the search criterias entered by the user ( > represented by the value held by the 'ajaxSearchInputField' )
  				var ajaxSearchData = _ajaxSearchInputField.value; // the current value of the input field wich has an 'onkeyup' event attached to it (..)
  				// WIP trickery :/
  				//ajaxSearchData = 'Rails';
  				/* setup a "<script id="rails-jsonp-ajax-search" src="(..)"> </script> " to send the query to the Rails server and got it calling the '' defined as 'callback Fcn' in our URL & [Rails-]server side ;p */
  				var railsJsonpScript = theDocument.createElement('script'); // create a <script> tag
  				railsJsonpScript.id = 'rails-jsonp-search-script'; // give it an id
  				railsJsonpScript.type = 'text/javascript'; // set its type
  	
  				// var railsAjaxSearchPath = 'http://localhost:3000/ajaxsearch?lookingfor='; /* [ MOVED UPWARDS FOR EASIER ACCESS (..) ] */
  				// create the path we 'll use to make the JSONP request
  				var jsonpSearchPath = _railsJsonpSearchPath + ajaxSearchData; // append the content of the input text field parameters, to form a new 'path' used to query the Rails server
  				// setup the src of the 'railsJsonpScript' to fit our needs (..)
  				railsJsonpScript.src = jsonpSearchPath;
  				// the Fcn/code to be called once a response is received from the Rails server is actually passed as 'callback' parameter to the Rails server
  				// var railsJsonpSearchPath = 'http://stephaneagmacbookpro.local:3000/ajaxsearch.js?callback=sayBla&lookingfor='; // simpliest form of the path (> not containing variables for parameters such as callback Fcn (..) )
  	
  				// actually send the JSONP request to the Rails server ( the Fcn passed as 'callback' parameter 'll get called once it has loaded)
  				theDocument.getElementsByTagName("head")[0].appendChild(railsJsonpScript); 
  	
  			}
  			
  			// Fcn that 'cleans up' the last JSON used to fetch data from the Rails server
			function _cleanupJsonpSearch(){
				// cleanup of the <script> element
				var railsJsonpUsedScript = theDocument.getElementById('rails-jsonp-search-script');
				// remove it from the head
				theDocument.getElementsByTagName("head")[0].removeChild(railsJsonpUsedScript);
				// delete it (> digg the pros/cons (..) )
				delete railsJsonpUsedScript;
				console.log('_handleJSONPDataFromRails(theDataFromRails) Fcn : rails-jsonp-search-script cleanup done.');
				_re_initCodeHighlighting();
			}
  			
  			// Fcn that handles the 'onkeyup' event triggered by the 'ajax-search-input-textfield'
  			function _initAjaxSearchInputTxtField(){
  				console.log('_initAjaxSearchInputTxtField executed.')
  				if( typeof(_ajaxSearchInputField) != 'undefined' && _ajaxSearchInputField != null ){ // if the search input is present on the page (..)
  					_ajaxSearchInputField.onkeyup = function(){ 
  						console.log('Key up happend!');
  						_ajaxAutoCompleteSearchHandler();
  					};
  				}
  			}
  			
  			// Fcn to handle the click on the 'add code' button in the app/views/posts/_form.html.erb (..)
  			function _initAddCodeBtn(){
  				console.log('initAddCodeBtn executed.')
  				var addCodeBtn = theDocument.getElementById('addCodeBtn');
  				if( typeof(addCodeBtn) != 'undefined' && addCodeBtn != null ){ // the button is present on the current page
  					console.log('addCodeBtn is present on the current page.')
  					var postContentTxtArea =  theDocument.getElementById('post_content'); // get q reference to the post content text area
  					addCodeBtn.onmouseup = function(){ // and attach an event for each time to mouse click is released on it
  						// IN THE FUTURE, UPDATE THE FOLLOWING TO ADD THE 'code area' RIGHT AFTER THE USER'S CURSOR (..)
  						postContentTxtArea.value += '\n<pre class="prettyprint">\n\n</pre>'; // add a '<pre class="prettprint"></pre>' to the text area, with space in it (..)
  					}
  				}
  			}
  			
  			/* [ R: as info, the following were previously defined directly in a <script> tag in the 'application.html.erb' file (..) ] */
  			
  			// Fcn that handles the reception of data coming from the Rails server using the current impl of the JSONP protocol & appending content on page before doing some 'JSONP cleanup' (..)
  			function _handleJSONPDataFromRails(theDataFromRails){
				console.log('_handleJSONPDataFromRails(theDataFromRails) Fcn called ..');
				console.log(theDataFromRails);
				// the variables holding the content
				var theRightPost_post = theDataFromRails.theRightPost[0];
				var criteriasInTitle_posts = theDataFromRails.criteriasInTitle;
				var server_ip_addr = theDataFromRails.serverIP;
				console.log('Rails server IP addr: ' + server_ip_addr);
				// create a 'holder' for our content
				var resultsHolderDiv = theDocument.createElement('div');
				resultsHolderDiv.id = 'resultsHolderDiv';
				// then I re-create using JS all the 'components' of the actual 'brainPosts' ( we use the 'createBrainPost Fcn' for that ( > in the 'views_module.js' file (..) ) )
				
				// /* R: ADD AT LEAST A BTN TO 'CLOSE' THE SEARCH-RESULTS & EMPTY THE SEARCH INPUT FIELD ABOVE THE SEARCH RESULTS [ > SO, HERE! :p ] */ //
				
				//if we have a fully matching post, we create its html holder & append it to the 'resultsHolderDiv'
				// ADD A TITLE HERE 'fully matching post found'
				if( typeof( theRightPost_post ) != "undefined" ){ // if a title exist ( > thus if the post itself exists too ;p )
					console.log('exact post found!');
					// actually create it
					//var fullyMatchingPost = createBrainPost(theRightPost_post.name, theRightPost_post.title, theRightPost_post.created_at, theRightPost_post.updated_at, theRightPost_post.techs, theRightPost_post.sources, theRightPost_post.content, "", "", "", theRightPost_post.id); // was working before edition to add the server ip address (..)
					var fullyMatchingPost = neatFramework.views_module_createBrainPost(theRightPost_post.name, theRightPost_post.title, theRightPost_post.created_at, theRightPost_post.updated_at, theRightPost_post.techs, theRightPost_post.sources, theRightPost_post.content, 'http://' + server_ip_addr +'/posts/' + theRightPost_post.id, 'http://' + server_ip_addr +'/posts/' + theRightPost_post.id + '/edit', 'http://' + server_ip_addr +'/posts/' + theRightPost_post.id, theRightPost_post.id);
					// useful : http://' + server_ip_addr +'/posts/' +
					// and append it to the 'resultsHolderDiv'
					resultsHolderDiv.appendChild( fullyMatchingPost );
				
				} else {
					console.log('no exact post found :/ !');
				}
				// then, we create & add all the other posts containing all the search criterias we 've found
				// ADD A TITLE HERE 'fully matching post found'
				for (j=0; j < criteriasInTitle_posts.length; j++){
					console.log( '------------------  Post Start ------------------' );
					console.log('Post ID: ' + criteriasInTitle_posts[j].id );
					console.log('Post name: ' + criteriasInTitle_posts[j].name );
					console.log('Post title: ' + criteriasInTitle_posts[j].title );
					console.log('Post techs: ' + criteriasInTitle_posts[j].techs );
					console.log('Post sources: ' + criteriasInTitle_posts[j].sources );
					console.log('Post content: ' + criteriasInTitle_posts[j].content );
					console.log('Post creation date: ' + criteriasInTitle_posts[j].created_at );
					console.log( '------------------  Post End ------------------' );
				 	var onePost = neatFramework.views_module_createBrainPost(criteriasInTitle_posts[j].name, criteriasInTitle_posts[j].title, criteriasInTitle_posts[j].created_at, criteriasInTitle_posts[j].created_at, criteriasInTitle_posts[j].techs, criteriasInTitle_posts[j].sources, criteriasInTitle_posts[j].content, 'http://' + server_ip_addr +'/posts/' + criteriasInTitle_posts[j].id, 'http://' + server_ip_addr +'/posts/' + criteriasInTitle_posts[j].id + '/edit', 'http://' + server_ip_addr +'/posts/' + criteriasInTitle_posts[j].id, criteriasInTitle_posts[j].id);				
				
					resultsHolderDiv.appendChild( onePost );				
				}
				// finally, use the 'freshly created' innerHTML of the 'resultsHolderDiv' as our '' content ..
				_searchResultsDiv.innerHTML = '';// empty the results holder before appending content to it
				_searchResultsDiv.appendChild( resultsHolderDiv );	
		
				// cleanup the JSONP used for 'data fetching'
				setTimeout(function(){
					_cleanupJsonpSearch();
					console.log('cleaning up ...');
					//alert('cleaning up');
				}, 0);
			}
  			
  			// Fcn that make uses of the 'webkit speech input' (not yet available on iOS browsers, nb)
  			function _handleSpeechInputForSearch(speech){
    			//alert("You Said: " + speech); // alert & display the recognized speech
    			theDocument.getElementById('ajax-search-input').value = speech; // reflect the speech input the user just made by changing the value present in the 'ajax-search-input' text field (..)
    	
    			/* following code is actually ~ a copy/paste of the 'delayed...' in application.js ( All it does is trigger a 'JSONP search' to the Rails server using the speech input given*/
    			console.log('delayedAutoCompleteSearchUsingJSONP Fcn executed ..');
  	
  				// get the search criterias entered by the user ( > represented by the value held by the 'ajaxSearchInputField' )
  				var ajaxSearchData = speech; // the value received after analysis of the speech input (..)
  				var railsJsonpScript = theDocument.createElement('script'); // create a <script> tag
  				railsJsonpScript.id = 'rails-jsonp-search-script'; // give it an id
  				railsJsonpScript.type = 'text/javascript'; // set its type
  				// create the path we 'll use to make the JSONP request
  				var jsonpSearchPath = 'http://stephaneagmacbookpro.local:3000/ajaxsearch.js?callback='+ _railsJsonpSearchCallbackFcn +'&lookingfor=' + ajaxSearchData; // append the content of the input text field parameters, to form a new 'path' used to query the Rails server
  				// setup the src of the 'railsJsonpScript' to fit our needs (..)
  				railsJsonpScript.src = jsonpSearchPath;
  				// the Fcn/code to be called once a response is received from the Rails server is actually passed as 'callback' parameter to the Rails server
  				// var railsJsonpSearchPath = 'http://stephaneagmacbookpro.local:3000/ajaxsearch.js?callback=sayBla&lookingfor='; // simpliest form of the path (> not containing variables for parameters such as callback Fcn (..) )
  	
  				// actually send the JSONP request to the Rails server ( the Fcn passed as 'callback' parameter 'll get called once it has loaded)
  				theDocument.getElementsByTagName("head")[0].appendChild(railsJsonpScript); 
    		}
    		
    		// Fcn that allow 'code highlighting' (..) // R: improve way of loading CSS/js files to prevent error thrown (..)
    		function _onload_initCodeHighlighting(){
    			addEventListener('load', function (event) { prettyPrint() }, false);
    			console.log('google code prettifier loaded successfully!');
    		}
    		
    		function _re_initCodeHighlighting(){
    			prettyPrint();
    			console.log('google code prettifier reloaded successfully!');
    		}
    		
  			
  		/* // Fcns definitions END // */	
		
		/* ************************************************************************************************************************************************ */
		
		// the module version variable
		var _module_version = '[ brainApp_module.js v0.1a ]';
		
		// framework scope
		var neatFramework = theWindow.neatFramework || {}; // if 'neatFramework' is not defined, we make it equal to an empty object
		theWindow.neatFramework = neatFramework; // and then use it as the window.neatFramework object (..)
		
		// the brainApp's init Fcn
		function _initBrainApp(){
			console.log('[ brainApp_module.js ] : ' + 'initiating BrainApp ..'); // debug message > app is launching
			// call the internally defined Fcns here, and DONT FORGET TO ALSO MAKE SOME OF THEM ( sayBla & sayThis ) AVAILABLE IN THE 'window.neatFramework' scope (..)
			_initAjaxSearchInputTxtField(); // init the search input field
			// the 'speech input' is currently defined directly html-side (..)
			_initAddCodeBtn(); // init the 'addCodeBtn', if present on the page ( actually made for 'app/views/posts/_form.html.erb' file (..) )
			_onload_initCodeHighlighting(); // init the code highlighting on appt init (..)
			
			
			
		}
		
		// make available some fcns outside of the 'Self Executing Anonymous Function' of the 'brainApp_module' closure ..
		neatFramework.brainApp_module_version = _module_version; // attach it to 'theWindow' ( > wich is defined 'upon' window (..) )
		neatFramework.brainApp_module__initBrainApp = _initBrainApp; // will be called  at init ( from 'app_logic.js' file )
		neatFramework.brainApp_module_ajaxAutoCompleteSearchHandler = _ajaxAutoCompleteSearchHandler; // will be called when a keyup event occurs on the ajax-search-input-field ( from the 'application.html.erb' file )
		neatFramework.brainApp_module_handleSpeechInputForSearch = _handleSpeechInputForSearch; // will be called when the xspeech wbekit speech input is used (..)
		neatFramework.brainApp_module_handleJSONPDataFromRails = _handleJSONPDataFromRails; // needed for when the Rails server responds in JSONP
		
	})(window, document);