/* 
	animations_module.js - A javascript module providing neat CSS3-based animations (..)
	by StephaneAG - 2013
 */

// Self_executing_Anonymous Fcn ( providing closure & preventing polluting the global namespace (..) )
// R: 'barebone syntax' : (function(){})(); 
	(function(theWindow, theDocument, theUndefined){
		var undef; // an undefined var
		// some 'closures' tests ..
		//console.log('[ animations_module.js ] theWindow == window ? : ' + ( theWindow == window ) ); // true
		//console.log('[ animations_module.js ] theDocument == document ? : ' + ( theDocument == document ) ); // true
		//console.log('[ animations_module.js ] theUndefined == "undefined" ? : ' + ( theUndefined == undef ) ); // true
		
		/* ************************************************************************************************************************************************ */
		// our actual module code ..
		
		
		
		/* ************************************************************************************************************************************************ */
		
		// the module version variable
		var _module_version = '[ animations_module.js v0.1a ]';
		
		// framework scope
		var neatFramework = theWindow.neatFramework || {}; // if 'neatFramework' is not defined, we make it equal to an empty object
		theWindow.neatFramework = neatFramework; // and then use it as the window.neatFramework object (..)
		
		// make available some fcns outside of the 'Self Executing Anonymous Function' of the 'animations_module' closure ..
		neatFramework.Barebone_module_version = _module_version; // attach it to 'theWindow' ( > wich is defined 'upon' window (..) )
		
	})(window, document);