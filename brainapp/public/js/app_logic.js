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

/* 
	app_logic.js - A javascript module file holding the overall logic ( Here with its 'header' edited for Rails (..) )
	by StephaneAG - 2013
 */

// Self_executing_Anonymous Fcn ( providing closure & preventing polluting the global namespace (..) )
// R: 'barebone syntax' : (function(){})(); 
	(function(theWindow, theDocument, theUndefined){
		var undef; // an undefined var
		// some 'closures' tests ..
		//console.log('[ app_logic.js ] theWindow == window ? : ' + ( theWindow == window ) ); // true
		//console.log('[ app_logic.js ] theDocument == document ? : ' + ( theDocument == document ) ); // true
		//console.log('[ app_logic.js ] theUndefined == "undefined" ? : ' + ( theUndefined == undef ) ); // true
		
		
		/* ************************************************************************************************************************************************ */
		// the 'App logic' 'barebone code' ( used to init the App, configure it using the provided modules, and defining the initial (>default) & additional setup(s) Fcns to execute (..) )
		
		// a Fcn that checks if the modules are correctly loaded/present on the page (..)
		function _check_modules(){
			// check the 'views_module' version
			if (typeof(theWindow.neatFramework.views_module_version) != 'undefined' && theWindow.neatFramework.views_module_version != null){
  				// it exists.
  				console.log( '[ app_logic.js ] > views module found : ' + theWindow.neatFramework.views_module_version );
			} else {
				console.log( '[ app_logic.js ] > views module not found.' );
			}
			// check the 'network_module' version
			if (typeof(theWindow.neatFramework.network_module_version) != 'undefined' && theWindow.neatFramework.network_module_version != null){
  				// it exists.
  				console.log( '[ app_logic.js ] > network module found : ' + theWindow.neatFramework.network_module_version );
			} else {
				console.log( '[ app_logic.js ] > network module not found.' );
			}
			// check the 'utils_module' version
			if (typeof(theWindow.neatFramework.utils_module_version) != 'undefined' && theWindow.neatFramework.utils_module_version != null){
  				// it exists.
  				console.log( '[ app_logic.js ] > utils module found : ' + theWindow.neatFramework.utils_module_version );
			} else {
				console.log( '[ app_logic.js ] > utils module not found.' );
			}
			// check the 'iOS_module' version
			if (typeof(theWindow.neatFramework.iOS_module_version) != 'undefined' && theWindow.neatFramework.iOS_module_version != null){
  				// it exists.
  				console.log( '[ app_logic.js ] > iOS module found : ' + theWindow.neatFramework.iOS_module_version );
			} else {
				console.log( '[ app_logic.js ] > iOS module not found.' );
			}
			// check the 'helpers_module' version
			if (typeof(theWindow.neatFramework.helpers_module_version) != 'undefined' && theWindow.neatFramework.helpers_module_version != null){
  				// it exists.
  				console.log( '[ app_logic.js ] > helpers module found : ' + theWindow.neatFramework.helpers_module_version );
			} else {
				console.log( '[ app_logic.js ] > helpers module not found.' );
			}
			
			/* the following 'module' is holds the actual cod of the Rails 'brainApp' app (..) */
			if (typeof(theWindow.neatFramework.brainApp_module_version) != 'undefined' && theWindow.neatFramework.brainApp_module_version != null){
  				// it exists.
  				console.log( '[ app_logic.js ] > brainApp module found : ' + theWindow.neatFramework.brainApp_module_version );
			} else {
				console.log( '[ app_logic.js ] > brainApp module not found.' );
			}
		}
		
		// a Fcn that handles the 'initial setup', at App init (..)
		function _initial_setup__app_init(){
			console.log( '[ app_logic.js ] > _initial_setup__app_init executed .. ' );
			//initial setup config of our App
			neatFramework.utils_module_disable_context_menu(); // disable the context menu on all devices (desktop | mobile)
			neatFramework.utils_module_get_device_type(); // get current browsing device type
			neatFramework.utils_module_support_fullscreen(); // check if the current browsing device support fullscreen
	
			//neatFramework.utils_module_support_history_api();
			//debug
			//neatFramework.utils_module_read_current_history_stack();
	
			//ios specific parts of the init
			neatFramework.iOS_module_handle_standalone_status_bar_spacer();
			neatFramework.iOS_module_handle_fullscreen_support();
			//neatFramework.iOS_module_disable_elastic_scrolling(); // WILL BE NEEDED FOR FRAMEWORK TO BE EFFECTIVE ON iOS (..)
			//neatFramework.iOS_module_setup_custom_scroll('longHeightContent'); // WILL BE NEEDED FOR FRAMEWORK TO BE EFFECTIVE ON iOS (..)
		}
		
		/* additional setup Fcns */
		
		// The following get called once wen the initial setup ( App init ) has finished processing (..)
		function _additional_setup__app_init(){
			console.log( '[ app_logic.js ] > _additional_setup__app_init executed .. ' );
			// init the stuff specific to our Rails app here ( > defined in its own module, nb (..) [ for obvious reasons ;p ] )
			neatFramework.brainApp_module__initBrainApp();
			
		}
		
		// The following is more likely to be executed after a page reload when using 'Ajax-like' navigation (..)
		function _additional_setup__content_swap(){
			console.log( '[ app_logic.js ] > _additional_setup__content_swap executed .. ' );
			// re-init/update special needs here  (..)
		}
		
		/* ************************************************************************************************************************************************ */
		
		
		
		// the module test variable
		var _module_version = '[ app_logic.js v0.1a ]';
		
		// framework scope
		var neatFramework = theWindow.neatFramework || {}; // if 'neatFramework' is not defined, we make it equal to an empty object
		theWindow.neatFramework = neatFramework; // and then use it as the window.neatFramework object (..)
		
		// the App's init Fcn
		function _initApp(){
			console.log('[ app_logic.js ] : ' + 'initiating app ..'); // debug message > app is launching
			_check_modules(); // check if the necessary modules are present
			_initial_setup__app_init(); // actually init the app's 'initial setup' config/params (..)
			_additional_setup__app_init(); // continue configuring our app & further specifying our needs (..)
			
		}
		
		// make available some fcns outside of the 'Self Executing Anonymous Function' of the 'app_logic' closure ..
		neatFramework.app_logic_version = _module_version; // attach it to 'theWindow' ( > wich is defined 'upon' window (..) )
		//neatFramework.app_logic_check_modules = _check_modules; // was nice to have for debug ;p
		//neatFramework.app_logic_initApp = _initApp; // same as above (..)
		
		
		
		/* ************************************************************************************************************************************************ */
		// actually init the App ..
		_initApp();
		/* ************************************************************************************************************************************************ */
		
	})(window, document);