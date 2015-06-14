/* 
	iOS_module.js - A javascript module providing 'combined' support for 'responsive & adaptive' designs on iOS devices (..)
	by StephaneAG - 2013
 */

// Self_executing_Anonymous Fcn ( providing closure & preventing polluting the global namespace (..) )
// R: 'barebone syntax' : (function(){})(); 
	(function(theWindow, theDocument, theUndefined){
		var undef; // an undefined var
		// some 'closures' tests ..
		//console.log('[ iOS_module.js ] theWindow == window ? : ' + ( theWindow == window ) ); // true
		//console.log('[ iOS_module.js ] theDocument == document ? : ' + ( theDocument == document ) ); // true
		//console.log('[ iOS_module.js ] theUndefined == "undefined" ? : ' + ( theUndefined == undef ) ); // true
		
		/* ************************************************************************************************************************************************ */
		// our actual module code ..
		
		var _initalY = _initalY || {}; // a variable used where the scroll is allowed
		
		// Handle the "ios standalone spacer" (div just behind the semi-translucent status bar)
		function _handle_standalone_status_bar_spacer(){
			var iosNotInStandaloneSpacer = theDocument.getElementById('iosNotInStandaloneSpacer');
			if (typeof( iosNotInStandaloneSpacer ) != 'undefined' && iosNotInStandaloneSpacer != null){
  				// exists.
  				var winNavigator = theWindow.navigator;
				if( ("standalone" in winNavigator && !winNavigator.standalone) ){
					iosNotInStandaloneSpacer.style.height = 0 + 'px';
  					iosNotInStandaloneSpacer.style.display = 'none';	
				} else if ( ("standalone" in winNavigator && winNavigator.standalone) ){	
				} else {
  					iosNotInStandaloneSpacer.style.height = 0 + 'px';
  					iosNotInStandaloneSpacer.style.display = 'none';	
  				}
			}
		}
	
		// Handle the fullscreen support + fix the orientationchange layout but on IOS
		function _handle_fullscreen_support(){
			var winNavigator = theWindow.navigator;
			if( ("standalone" in winNavigator && !winNavigator.standalone) ){
				if( !theWindow.location.hash && theWindow.addEventListener ){
    				theWindow.addEventListener( "load",function() { setTimeout(function(){ theWindow.scrollTo(0, 0); }, 0); });
    				theWindow.addEventListener( "orientationchange",function() { setTimeout(function(){ theWindow.scrollTo(0, 0); }, 0); });
    			}
			} else if ( ("standalone" in winNavigator && winNavigator.standalone) ){
				theWindow.addEventListener( "orientationchange",function() { setTimeout(function(){ theWindow.scrollTo(0, 0); }, 0); }); /* should fix the bug on IOS while in standalone mode */
			} else {
  			}
		}
	
		// Disable the elastic scrolling
		function _disable_elastic_scrolling(){
			_initalY = null; //init the var that will hold the actual position of the page
			theDocument.ontouchstart = function(e){_initalY = e.pageY};
			theDocument.ontouchend = function(e){_initalY = null};
			theDocument.ontouchcancel = function(e){_initalY = null};
			theDocument.ontouchmove = function(e){e.preventDefault()};
			console.log('IOS elastic scrolling is now disabled');
		}
	
		// Allow 'iOS native scrolling' on precise elements
		function _setup_custom_scroll(element){
			console.log('MyApp.IOS.setup_custom_scroll > Applying scroll on element: ' + element);
			var scrollableElement = theDocument.getElementById(element);
			
			// check the presence of the 'scrollableElement'
			if (typeof(scrollableElement) != 'undefined' && scrollableElement != null){
  				// exists.
  				scrollableElement.ontouchmove = function(event){
					event.stopPropagation();
					if(_initalY !== null){
						var scrollDirection = event.touches[0].pageY - _initalY;
						var contentNode = event.currentTarget;
						if(scrollDirection > 0 && contentNode.scrollTop <= 0){
        					event.preventDefault();
        				} else if(scrollDirection < 0 && contentNode.scrollTop >= contentNode.scrollHeight - contentNode.clientHeight) {
        					event.preventDefault();
        				} else {
        				}
        			}
				}
			}	
		}
		
		
		/* ************************************************************************************************************************************************ */
		
		// the module version variable
		var _module_version = '[ iOS_module.js v0.1a ]';
		
		// framework scope
		var neatFramework = theWindow.neatFramework || {}; // if 'neatFramework' is not defined, we make it equal to an empty object
		theWindow.neatFramework = neatFramework; // and then use it as the window.neatFramework object (..)
		
		// make available some fcns outside of the 'Self Executing Anonymous Function' of the 'iOS_module' closure ..
		neatFramework.iOS_module_version = _module_version; // attach it to 'theWindow' ( > wich is defined 'upon' window (..) )
		neatFramework.iOS_module_handle_standalone_status_bar_spacer = _handle_standalone_status_bar_spacer;
		neatFramework.iOS_module_handle_fullscreen_support = _handle_fullscreen_support;
		neatFramework.iOS_module_disable_elastic_scrolling = _disable_elastic_scrolling;
		neatFramework.iOS_module_setup_custom_scroll = _setup_custom_scroll;
		
	})(window, document);