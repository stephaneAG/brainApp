/* 
	views_module.js - A javascript module file handling 'views' creation (..)
	by StephaneAG - 2013
 */

// Self_executing_Anonymous Fcn ( providing closure & preventing polluting the global namespace (..) )
// R: 'barebone syntax' : (function(){})(); 
	(function(theWindow, theDocument, theUndefined){
		var undef; // an undefined var
		// some 'closures' tests ..
		//console.log('[ views_module.js ] theWindow == window ? : ' + ( theWindow == window ) ); // true
		//console.log('[ views_module.js ] theDocument == document ? : ' + ( theDocument == document ) ); // true
		//console.log('[ views_module.js ] theUndefined == "undefined" ? : ' + ( theUndefined == undef ) ); // true
		
		/* ************************************************************************************************************************************************ */
		// our actual code ..
		
		// a test Fcn
		function _createSimpleView(){
			console.log('[ views_module.js ] : ' + 'creating a simpleView ..');
		}
		
		// Fcn used by the Rails 'brainApp' to dynamically create 'brainPosts' from the received (and 'parsed') JSONP (..)
		function _createBrainPost(name, title, created_at_date, updated_at_date, techs, sources, content, show_link_url, edit_link_url, destroy_link_url, id){
			// the code right below is used to set random color to the techs & sources links (..)
			var cssColorsArray = ['#91bd09', 'rgb(169, 1, 75)', '#00ADEE', '#800080', 'rgb(45, 174, 191)', 'rgb(227, 49, 0)', '#e22092', 'rgb(255, 92, 0)', 'rgb(255, 181, 21)'];
		
			// use the data passed as parameters to setup the futur post's variables ( nb: here, I use the 'ternary operator' instead of if/else, for easier/more effiscient writing/reading(..) )
			var post_name = ( typeof( name ) != "undefined" )? name : "name not provided";
			var post_title = ( typeof( title ) != "undefined" )? title : "title not provided";
			var post_created_at_date = ( typeof( created_at_date ) != "undefined" )? created_at_date : "creation date not provided";
			var post_updated_at_date = ( typeof( updated_at_date ) != "undefined" )? updated_at_date : "last update date not provided";
			var post_techs = ( typeof( techs ) != "undefined" )? techs : "techs not provided";
			var post_sources = ( typeof( sources ) != "undefined" )? sources : "sources not provided";
			var post_content = ( typeof( content ) != "undefined" )? content : "content not provided";
			var post_show_link_url = ( typeof( show_link_url ) != "undefined" )? show_link_url : "show_link_url not provided";
			var post_edit_link_url = ( typeof( edit_link_url ) != "undefined" )? edit_link_url : "edit_link_url not provided";
			var post_destroy_link_url = ( typeof( destroy_link_url ) != "undefined" )? destroy_link_url : "destroy_link_url not provided";
			// the ID will be used to reconstruct URLs for the edit & show links of the posts. As info, 'destroy' does not have a specific URL, so it may need a 'manual route' (..)
			var post_id = ( typeof( id ) != "undefined" )? id : "id not provided";
			
			// actually create the necessary html elements to handle the above
			// the entire post holder div
			var postDiv = document.createElement('div');
			postDiv.className = 'brainPost';
			// the container of the title
			var post_titleH = document.createElement('h3');
			post_titleH.className = 'brainPost-title';
			post_titleH.innerHTML = post_title; // set the post's title
			// the container of the dates
			var post_datesP = document.createElement('p');
			post_datesP.className = 'brainPost-dates';
			post_datesP.innerHTML = 'Added on: ' + post_created_at_date + ' | Last edited on: ' + post_updated_at_date;
			// the container of the 'techs'
			var post_techsP = document.createElement('p');
			post_techsP.className = 'brainPost-techs';
			post_techsP.innerHTML = 'Techs: ';
				// before being able to setup correctly the 'techs', we need to split the string we got and use each of its elements
				var post_techs_array = post_techs.split(', ');
				// loop over each element found in the array
				for (i=0; i < post_techs_array.length; i++){ // for every 'tech' found, create a corresponding <a> (..)
					var post_tech_link = document.createElement('a');
					post_tech_link.href = '#'; // for later (..)
					post_tech_link.className = 'tech-link';
						// get a random color from our array defined right below the current Fcn declaration, to use it directly in the html 'style' attribute (..)
						var randCssColor = cssColorsArray[Math.floor(Math.random() * cssColorsArray.length)];
					post_tech_link.style.backgroundColor = randCssColor;
					post_tech_link.innerHTML = post_techs_array[i]; // finally, set the 'tech' as the link's text (..)
					// and, finally, add the element to the 'post_techsP'
					post_techsP.appendChild( post_tech_link ); // actually 'append it' to/in its parent (..)
					post_techsP.innerHTML += ' '; // a test to prevent the 'techs' links to be too close one to each ther ... I don't want them to make 'buggy-babies' ;p
				}
			// the container of the 'sources'
			var post_sourcesP = document.createElement('p');
			post_sourcesP.className = 'brainPost-sources';
			post_sourcesP.innerHTML = 'Sources: ';
				// before being able to setup correctly the 'sources', we need to split the string we got and use each of its elements
				var post_sources_array = post_sources.split(', ');
				// loop over each element found in the array
				for (i=0; i < post_sources_array.length; i++){ // for every 'tech' found, create a corresponding <a> (..)
					var post_source_link = document.createElement('a');
					post_source_link.href = '#'; // for later (..)
					post_source_link.className = 'source-link';
					post_source_link.innerHTML = post_sources_array[i]; // finally, set the 'tech' as the link's text (..)
					// and, finally, add the element to the 'post_sourcesP'
					post_sourcesP.appendChild( post_source_link ); // actually 'append it' to/in its parent (..)
					post_sourcesP.innerHTML += ' '; // a test to prevent the 'sources' links to be too close one to each ther ... I don't want them to make 'buggy-babies' ;p
				}
			// the spacer
			var post_spacerS =document.createElement('span');
			post_spacerS.className = 'brainPost-delimiter';
			// the actual post content
			var post_contentD = document.createElement('div');
			post_contentD.className = 'brainPost-content';
			post_contentD.innerHTML = post_content; // set the content of the post as the holer's innerHTML
			
			// 'last but not least', the show/edit/destroy links of the post & the div holding them
			var post_navlinkD = document.createElement('div');
			post_navlinkD.className = 'brainPost-navlinks';
			// the destroy link
			var post_navlink_destroy_link = document.createElement('a');
			post_navlink_destroy_link.className = 'ios-button-dark';
			post_navlink_destroy_link.innerHTML = 'Destroy';
			post_navlink_destroy_link.href = post_destroy_link_url; // reconstructed URL using id & server_ip_addr (..)
				// additional parameters are necessary for the 'destroy' link (..)
				post_navlink_destroy_link.setAttribute('data-confirm', 'Are you sure?');
				post_navlink_destroy_link.setAttribute('data-method', 'delete');
				post_navlink_destroy_link.setAttribute('rel', 'nofollow');  
			post_navlinkD.appendChild( post_navlink_destroy_link ); // append it to its parent
			// the edit link
			var post_navlink_edit_link = document.createElement('a');
			post_navlink_edit_link.className = 'ios-button-dark';
			post_navlink_edit_link.innerHTML = 'Edit';
			post_navlink_edit_link.href = post_edit_link_url; // reconstructed URL using id & server_ip_addr (..)  
			post_navlinkD.appendChild( post_navlink_edit_link ); // append it to its parent
			// the show link
			var post_navlink_show_link = document.createElement('a');
			post_navlink_show_link.className = 'ios-button-dark';
			post_navlink_show_link.innerHTML = 'Show';
			post_navlink_show_link.href = post_show_link_url; // reconstructed URL using id & server_ip_addr (..) 
			post_navlinkD.appendChild( post_navlink_show_link ); // append it to its parent
			
			// and two more links that will be used, I hope, by the futur additions in the interface (search stack & snippets ..)
			// the 'add to Search-Stack' link
			var post_navlink_search_stack_link = document.createElement('a');
			post_navlink_search_stack_link.className = 'addToSearchStackBtn ios-button-light';
			post_navlink_search_stack_link.innerHTML = ' Add to Search-Stack ';
			post_navlink_search_stack_link.href = '#'; 
			post_navlinkD.appendChild( post_navlink_search_stack_link ); // append it to its parent
			
			// the 'add to Snippets' link
			var post_navlink_snippets_link = document.createElement('a');
			post_navlink_snippets_link.className = 'addToSnippetsBtn ios-button-light';
			post_navlink_snippets_link.innerHTML = ' Add to Snippets ';
			post_navlink_snippets_link.href = '#'; // reconstruct the URL using id (..) 
			post_navlinkD.appendChild( post_navlink_snippets_link ); // append it to its parent
		
			// add all the element to their parent
			postDiv.appendChild( post_titleH ); // append the title <h3>
			postDiv.appendChild( post_datesP ); // append the dates <p>
			postDiv.appendChild( post_techsP ); // append the techs <p>
			postDiv.appendChild( post_sourcesP ); // append the source <p>
			postDiv.appendChild( post_spacerS ); // append the spacer <span>
			postDiv.appendChild( post_contentD ); // append the content
			postDiv.appendChild( post_navlinkD ); // append the navlinks
			// return their parent
			return postDiv; // finally ;p
		
		}
		
		/* ************************************************************************************************************************************************ */
		
		// the module version variable
		var _module_version = '[ views_module.js v0.1a ]';
		
		// framework scope
		var neatFramework = theWindow.neatFramework || {}; // if 'neatFramework' is not defined, we make it equal to an empty object
		theWindow.neatFramework = neatFramework; // and then use it as the window.neatFramework object (..)
		
		// make available some fcns outside of the 'Self Executing Anonymous Function' of the 'views_module' closure ..
		neatFramework.views_module_version = _module_version; // attach it to 'theWindow' ( > wich is defined 'upon' window (..) )
		neatFramework.views_module_createSimpleView = _createSimpleView; // same as above (..)
		neatFramework.views_module_createBrainPost =  _createBrainPost; // make it available to use from the 'brainApp' module (..)
		
	})(window, document);