/* 
	network_module.js - A javascript module file handling network-related operations (..)
	by StephaneAG - 2013
 */

// Self_executing_Anonymous Fcn ( providing closure & preventing polluting the global namespace (..) )
// R: 'barebone syntax' : (function(){})(); 
	(function(theWindow, theDocument, theUndefined){
		var undef; // an undefined var
		// some 'closures' tests ..
		//console.log('[ network_module.js ] theWindow == window ? : ' + ( theWindow == window ) ); // true
		//console.log('[ network_module.js ] theDocument == document ? : ' + ( theDocument == document ) ); // true
		//console.log('[ network_module.js ] theUndefined == "undefined" ? : ' + ( theUndefined == undef ) ); // true
		
		/* ************************************************************************************************************************************************ */
		// our actual code ..
		
		// /* Xml Http Requests */
		// synchronous XHR
		function _xhrRequest(){
			console.log('[ network_module.js ] : ' + 'creating XHR request ..');
		}
		
		// asynchronous XHR
		function _async_xhrRequest(theURL){
			console.log('[ network_module.js ] : ' + 'creating _async_xhrRequest ..');
			var xhr = new XMLHttpRequest();
			//DEBUG
			console.log('[ network_module.js ] : ' + 'using URL: ' + theURL);
			xhr.open("GET",
					 theURL,
					 true);//false); // now it should be synchronous
			//xhr.setRequestHeader('Content-Type', 'text/xml');
			//xhr.overrideMimeType('text/xml');
    		xhr.onreadystatechange = function () {
        		if (xhr.status == 200 && xhr.readyState == 4) {
					if(xhr.responseText){
						console.log('[ network_module.js ] : ' + 'responseText received: ' + xhr.responseText);
						return xhr.responseText; // return the 'xhr.responseText'
					}
				// future callback Fcn here (caming from anothe Fcn ;p )
				//MyApp.Links.setup_history_clicks(); // in case we have to re-add event listeners to freshly loaded content (> ex: if it contain links)
				return true;
        		}
    		};
			xhr.send(null);
			return false;
		}
		
		// asynchronous XHR with callback Fcn
		function _async_xhrRequest_withCallback(theURL, theCallbackFcn){
			console.log('[ network_module.js ] : ' + 'creating _async_xhrRequest ..');
			var xhr = new XMLHttpRequest();
			//DEBUG
			console.log('[ network_module.js ] : ' + 'using URL: ' + theURL);
			xhr.open("GET",
					 theURL,
					 true);//false); // now it should be synchronous
			//xhr.setRequestHeader('Content-Type', 'text/xml');
			//xhr.overrideMimeType('text/xml');
    		xhr.onreadystatechange = function () {
        		if (xhr.status == 200 && xhr.readyState == 4) {
					if(xhr.responseText){
						console.log('[ network_module.js ] : ' + 'responseText received: ' + xhr.responseText);
						return xhr.responseText; // return the 'xhr.responseText'
					}
				// future callback Fcn here (caming from anothe Fcn ;p )
				theCallbackFcn(); // execute the 'callbac Fcn' passed as 2nd parameter
				//MyApp.Links.setup_history_clicks(); // in case we have to re-add event listeners to freshly loaded content (> ex: if it contain links)
				return true;
        		}
    		};
			xhr.send(null);
			return false;
		}
		
		
		// current IMPLM debug 'non-generic' XHR (..)
		function _DEBUG_async_xhrRequest(href){
			var xhr = new XMLHttpRequest();
			//DEBUG
			console.log('href: ' + href);
			xhr.open("GET",
				href, //+ "#longHeightContent",
				//"http://stephaneadamgarnier.com/JavascriptDev/HTML5HistoryAPIProof/target.html#longHeightContent",
				true);//false); // now it should be synchronous
			//xhr.setRequestHeader('Content-Type', 'text/xml');
			//xhr.overrideMimeType('text/xml');
    		xhr.onreadystatechange = function () {
        		if (xhr.status == 200 && xhr.readyState == 4) {
            		//document.getElementById('longHeightContent').innerHTML = 'I love Dumbo';
					console.log('XHR responseText: ' + xhr.responseText);
					if(xhr.responseText){
						var htmlContent = document.createElement('div');
						htmlContent.innerHTML = xhr.responseText;
						var pageDivs = htmlContent.getElementsByTagName('div')
						//console.log('pageDivs[0].innerHTML: ' + pageDivs[0].innerHTML);
						console.log('is it good ?: ' + pageDivs[8].innerHTML);
						var contentContainer = document.getElementById('longHeightContent');
						contentContainer.innerHTML = pageDivs[8].innerHTML;
					}
				//MyApp.Links.setup_history_clicks(); // in case we have to re-add event listeners to freshly loaded content (> ex: if it contain links)
				neatFramework.utils_setup_history_clicks();
				return true;
        		}
    		};
			xhr.send(null);
			console.log('_DEBUG_async_xhrRequest > window location pathname: ' + window.location.pathname);
			//if(xhr.status == 200 && xhr.readyState == 4){
				//it appears that i don't know (yet) how to fetch ONLY a div's content from an url in plain vanilla javascript
				//var contentFromXhr = xhr.responseXML.getElementById('longHeightContent');
				//console.log(contentFromXhr);
				//document.getElementById('longHeightContent').innerHTML = contentFromXhr;	
				//document.getElementById('longHeightContent').innerHTML = xhr.responseText;
				//document.getElementById('longHeightContent').innerHTML = 'I love Dumbo';
				//console.log(xhr.responseXML);
				//MyApp.Links.setup_history_clicks(); // in case we have to re-add event listeners to freshly loaded content (> ex: if it contain links)
				//return true;
			//}
			return false;
		}
		
		// JSONP Requests
		function _jsonpRequest(){
			console.log('[ network_module.js ] : ' + 'creating JSONP request ..');
		}
		
		
		
		/* ************************************************************************************************************************************************ */
		
		// the module version variable
		var _module_version = '[ network_module.js v0.1a ]';
		
		// framework scope
		var neatFramework = theWindow.neatFramework || {}; // if 'neatFramework' is not defined, we make it equal to an empty object
		theWindow.neatFramework = neatFramework; // and then use it as the window.neatFramework object (..)
		
		// make available some fcns outside of the 'Self Executing Anonymous Function' of the 'network_module' closure ..
		neatFramework.network_module_version = _module_version; // attach it to 'theWindow' ( > wich is defined 'upon' window (..) )
		neatFramework.network_module_xhrRequest = _xhrRequest; // same as above (..)
		neatFramework.network_module_jsonpRequest = _jsonpRequest; // same as above (..)
		neatFramework.network_module_DEBUG_async_xhrRequest = _DEBUG_async_xhrRequest;
		
	})(window, document);