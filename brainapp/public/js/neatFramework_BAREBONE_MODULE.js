/* 
	Barebone_module.js - A javascript module providing neat Barebone tweaks (..)
	by StephaneAG - 2013
 */

// Self_executing_Anonymous Fcn ( providing closure & preventing polluting the global namespace (..) )
// R: 'barebone syntax' : (function(){})(); 
	(function(theWindow, theDocument, theUndefined){
		var undef; // an undefined var
		// some 'closures' tests ..
		//console.log('[ Barebone_module.js ] theWindow == window ? : ' + ( theWindow == window ) ); // true
		//console.log('[ Barebone_module.js ] theDocument == document ? : ' + ( theDocument == document ) ); // true
		//console.log('[ Barebone_module.js ] theUndefined == "undefined" ? : ' + ( theUndefined == undef ) ); // true
		
		/* ************************************************************************************************************************************************ */
		// our actual module code ..
		
		
		
		/* ************************************************************************************************************************************************ */
		
		// the module version variable
		var _module_version = '[ Barebone_module.js v0.1a ]';
		
		// make available some fcns outside of the 'Self Executing Anonymous Function' of the 'Barebone_module' closure ..
		theWindow.Barebone_module_version = _module_version; // attach it to 'theWindow' ( > wich is defined 'upon' window (..) )
		
	})(window, document);