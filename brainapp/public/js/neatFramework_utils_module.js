/* 
	utils_module.js - A javascript module providing neat utility tools (..)
	by StephaneAG - 2013
 */

// Self_executing_Anonymous Fcn ( providing closure & preventing polluting the global namespace (..) )
// R: 'barebone syntax' : (function(){})(); 
	(function(theWindow, theDocument, theUndefined){
		var undef; // an undefined var
		// some 'closures' tests ..
		//console.log('[ utils_module.js ] theWindow == window ? : ' + ( theWindow == window ) ); // true
		//console.log('[ utils_module.js ] theDocument == document ? : ' + ( theDocument == document ) ); // true
		//console.log('[ utils_module.js ] theUndefined == "undefined" ? : ' + ( theUndefined == undef ) ); // true
		
		/* ************************************************************************************************************************************************ */
		// our actual module code ..
		
		// Disable the context menu (> right click on desktop browsers / touchhold & taphold on mobile devices)
		function _disable_context_menu(){
			theWindow.oncontextmenu = function(){
				return false;
			}
			console.log('The context menu is now disabled');
		}
		
		// Check the device type the user is browsing from
		function _get_device_type(){
			var navAgent = navigator.userAgent;
			if( (navAgent.match(/android/i)) || (navAgent.match(/android/i)) || (navAgent.match(/blackberry/i)) || (navAgent.match(/palm/i))  || (navAgent.match(/opera/i)) || (navAgent.match(/windows/i)) ){
				console.log('smartphone');
			} else if ( (navAgent.match(/iPad/i)) ){
				console.log('iPad');
			} else if( (navAgent.match(/iPhone/i)) || (navAgent.match(/iPod/i)) ){
				console.log('iPod/iPhone');
			} else if( !(navAgent.match(/iPod/i)) || (navAgent.match(/iPhone/i)) || (navAgent.match(/android/i)) || (navAgent.match(/blackberry/i)) || (navAgent.match(/palm/i))  || (navAgent.match(/opera/i)) || (navAgent.match(/windows/i)) ){
				console.log('desktop');
			}
		}
		
		// Handle fullscreen support
		function _support_fullscreen(){
			var winNavigator = theWindow.navigator;
			if( ("standalone" in theWindow.navigator && !theWindow.navigator.standalone) ){
				console.log('fullscreen mode supported, but unused at the moment');
			} else if ( ("standalone" in theWindow.navigator && theWindow.navigator.standalone) ){
				console.log('fullscreen mode supported, and in use right now');
			} else {
  				console.log('fullscreen mode not supported on this browser');
  			}
		}
		
		// Check support of the HTML5 history API in browser (adapted from code just below)
		//function support_history_api(){
		//	return !!(window.history && window.history.pushState);
		//}
		function _support_history_api(){
			var history = theWindow.history;
			var pushState = theWindow.history.pushState;
			if (history && pushState){
				console.log('HTML5 history api supported on this browser');
			//history & Ajax handling for historyAPI-supported browsers is right below
			_setup_history_clicks(); // we setup all the links on page for historyAPI / ajax
			
			_support_popstate_event(); // we add suppor for the popstate event (> browser back button click from user)
			} else {
				console.log('HTML5 history api not supported on this browser');
			}
		}
		
		// Read the current state from the HTML5 history stack (if it exists (both html5 history & a current state in the stack))
		function _read_current_history_stack(){
			var hist = theWindow.history;
			var pushState = theWindow.history.pushState;
			if (hist && pushState){
				if(hist.state){
					var currentState = hist.state;
					var currentTitle = hist.title;
					var currentUrl = hist.url;
					console.log('HTML5 history stack infos: ' + 'current state: '+ currentState + ' current title: ' + currentTitle + ' current url: ' + currentUrl);
				}	
			} 
		}
		
		// Fcn that setup the HTML5 history api on all 'ajaxlink' links on the page
		function _setup_history_clicks(){
		// here we use the 'addClicker' fct to add event listener to the provided elements
			//if(theDocument.getElementById('indexlink'))
			//_addClicker(document.getElementById('indexlink')); // LATER: >here we add it to all <a> on the page (without caring about their classes / their container[R: they can be added dynamically..])
			//for later: for (var i= document.links.length; i-->0;)
        	//document.links.onclick= clicklink;
        	var pageLinks = theDocument.links;
        	var ajaxLinks = [];
        	for(var i = 0; i < pageLinks.length; i++){
        		if( neatFramework.helpers_module_hasClass(pageLinks[i], 'ajaxlink') ){
        			_addClicker(pageLinks[i]);
        		}
        	}
        }
        
        // Add support for the popstate event
		function _support_popstate_event(){
			console.log('popstate event is now supported');
			theWindow.addEventListener("popstate", function(event){
				console.log('_support_popstate_event > window location pathname: ' + theWindow.location.pathname);
				neatFramework.network_module_DEBUG_async_xhrRequest(location.pathname); // (from tut (originally, with another context): location.pathname)
				//MyApp.Ajax.swapContentJq(location.pathname);		
			});
		}
        
        // Fcn that add event listeners to all link elements passed to it
		function _addClicker(link){
			var history = theWindow.history;
			link.addEventListener("click", function(event){
				console.log('internal link clicked');
				if(link.href.indexOf(location.hostname) > -1){ // if we are on the same host/domain (>aka the clicked link is internal)
				//if(link.href.indexOf(window.location) != -1){	
					//MyApp.Ajax.swapContentJq(link.href); // load content from the provided url
					neatFramework.network_module_DEBUG_async_xhrRequest(link.href);
					history.pushState(null,null, link.href); // push state to HTML5 history stack
					event.preventDefault(); // prevent the link from going to the link url (default behavior)
				}
			}, false);
		}
		
		// Fcn that swaps the passed div's content using data from the URL passed, fetched using JSONP or XHR
		function __swapContent(){
		
		}
	
	
		
		/* ************************************************************************************************************************************************ */
		
		// the module version variable
		var _module_version = '[ utils_module.js v0.1a ]';
		
		// framework scope
		var neatFramework = theWindow.neatFramework || {}; // if 'neatFramework' is not defined, we make it equal to an empty object
		theWindow.neatFramework = neatFramework; // and then use it as the window.neatFramework object (..)
		
		// make available some fcns outside of the 'Self Executing Anonymous Function' of the 'utils_module' closure ..
		neatFramework.utils_module_version = _module_version; // attach it to 'theWindow' ( > wich is defined 'upon' window (..) )
		neatFramework.utils_module_disable_context_menu = _disable_context_menu; // same as above (..)
		neatFramework.utils_module_get_device_type = _get_device_type;
		neatFramework.utils_module_support_fullscreen = _support_fullscreen;
		neatFramework.utils_module_support_history_api = _support_history_api;
		neatFramework.utils_module_read_current_history_stack = _read_current_history_stack;
		neatFramework.utils_setup_history_clicks = _setup_history_clicks;
		neatFramework.utils_support_popstate_event = _support_popstate_event;
		neatFramework.utils_addClicker = _addClicker;
		
	})(window, document);