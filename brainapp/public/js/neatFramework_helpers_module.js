/* 
	helpers_module.js - A javascript module providing helpers for faster/easier setups (..)
	by StephaneAG - 2013
 */

// Self_executing_Anonymous Fcn ( providing closure & preventing polluting the global namespace (..) )
// R: 'barebone syntax' : (function(){})(); 
	(function(theWindow, theDocument, theUndefined){
		var undef; // an undefined var
		// some 'closures' tests ..
		//console.log('[ helpers_module.js ] theWindow == window ? : ' + ( theWindow == window ) ); // true
		//console.log('[ helpers_module.js ] theDocument == document ? : ' + ( theDocument == document ) ); // true
		//console.log('[ helpers_module.js ] theUndefined == "undefined" ? : ' + ( theUndefined == undef ) ); // true
		
		/* ************************************************************************************************************************************************ */
		// our actual module code ..
		
		// the 'missing DOM Fcns', n°1: 'getElementsByClassName()'
		function _getElementsByClassName(c) {
    		var children = document.getElementsByTagName('*');
    		var els = [];
    		for (var i = 0, j = children.length; i < j; i++) if (hasClass(children[i], c)) els.push(children[i]);
    		return els;
		}
		
		// the 'missing DOM Fcns', n°2: 'hasClass()
		function _hasClass(el, c) {
  			var has = false;
  			if (!el || !el.className.length) return;
  			var bits = el.className.split(' ');
  			for (var j = 0; j < bits.length; j++) if (bits[j] === c) has = true;
  			return has;
		}
		
		
		/* ************************************************************************************************************************************************ */
		
		// the module version variable
		var _module_version = '[ helpers_module.js v0.1a ]';
		
		// framework scope
		var neatFramework = theWindow.neatFramework || {}; // if 'neatFramework' is not defined, we make it equal to an empty object
		theWindow.neatFramework = neatFramework; // and then use it as the window.neatFramework object (..)
		
		// make available some fcns outside of the 'Self Executing Anonymous Function' of the 'helpers_module' closure ..
		neatFramework.helpers_module_version = _module_version; // attach it to 'theWindow' ( > wich is defined 'upon' window (..) )
		neatFramework.helpers_module_getElementsByClassName = _getElementsByClassName;
		neatFramework.helpers_module_hasClass = _hasClass;
		
	})(window, document);