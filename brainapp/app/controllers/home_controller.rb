class HomeController < ApplicationController
# originally:
  #def index
  #end
  
  # Tef Edit 14/04/2013 0:00 ;p
  #require 'socket' # to get the IP addresses of the server / client(s)
  
  # the 'bare definition' for a simple index page listing all posts
  def index
  	#@posts = Post.all
  	# added to 'shrink' the displaid posts to only the last 2
	@posts = Post.all(:order => 'created_at DESC', :limit => 2)
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @posts }
    end
  end
  
  # Tef Edit on 04/04/2013 > adding the 'ajax autocomplete search' using another 'route matching' going to 'home#ajaxsearch'
  def ajaxsearch
  	#@posts = Post.all
  	
  	# a 'dumb test' for further implm of JSONP (..)
  	@hiThere = 'I like candies!'
  	
  	# get the data passed as parameter to the correct url ( ' http://localhost:3000/ajaxsearch?lookingfor= ' )
  	@searchdata = params[:lookingfor]
  	
  	# I guess the 'fully matching title post' is pssible to get from here above
  	@the_right_post = Post.where("title like ?", params[:lookingfor]) # uses the 'unsplitted' @searchdata ( normally equivalent to 'params[:lookingfor]' )
  	
  	@searchdata_array = @searchdata.split(" ");
	
	# build the search using the content found in @searchdata_array:
		# found posts whose titles 'matches' search criterias (..)
		@matching_titles_posts = Post # define Post
		@searchdata_array.each do |search_criteria| # loop through all search criterias extracted from the data passed in the url
		#@searchdata_array.each_index do |search_criteria| # loop through all search criterias extracted from the data passed in the url
			#@fully_matching_titles_posts = @matching_titles_posts.where("title like ?", search_criteria) # aim better the search each loop using the criterias (..) ## this line works when the posts'titles ARE all the criterias
			@matching_titles_posts = @matching_titles_posts.where("title like ?", "%#{search_criteria}%") # aim better the search each loop using the criterias (..) ## this line works when the posts'titles CONTAINS the criterias
		end
		# found posts whose techs 'matches' search criterias (..)
		# > will need a link to another table to be usefull (..)
		
	# Tef Edit 14/04/2013 0:00
	# get the client IP address
	#@server_ip_addr = request.env["SERVER_ADDR"] # null :/
	#@server_ip_addr = Socket.gethostname # 'brainApp'
	@server_ip_addr = request.host_with_port
	@client_ip_addr = request.remote_ip
	
    respond_to do |format|
      format.html # ajaxsearch.html.erb
      #format.json { render json: @hiThere } # the URL 'http://stephaneAGmacbookpro.local:3000/ajaxsearch.json?lookingfor=' works fine and displays 'I like candies!'
      format.json { render json: @matching_titles_posts } # the URL 'http://stephaneAGmacbookpro.local:3000/ajaxsearch.json?lookingfor=<stg>' works fine and displays the list of the corresponding entries founs in th db
      # 'by hand' add of JSONP support [> before trying 'rack-jsonp-middleware'] (..)
      format.js do
        #render :json => @matching_titles_posts, :callback => params[:callback] # 'params[:callback]' corresponds to 'http://<server_address>/<(..)>/<rails_route>.js?callback=<local_js_callback_Fcn>'
      	# wip of 12/04/2013 : adding multiple children in JSONP (..)
      	# define elements in the JSON
      	# 'as a hint :/' > respond_with({:ad => @ad, :map => @map, :article => @article}) ( >  the following ... WORKS ! [ "I like to call that 'Experimental Logic' ;D"] )
      	#render :json => {:theRightPost => @the_right_post, :criteriasInTitle => @matching_titles_posts}, :callback => params[:callback] # 'params[:callback]' corresponds to 'http://<server_address>/<(..)>/<rails_route>.js?callback=<local_js_callback_Fcn>'
      	render :json => {:theRightPost => @the_right_post, :criteriasInTitle => @matching_titles_posts, :serverIP => @server_ip_addr, :clientIP => @client_ip_addr}, :callback => params[:callback] # 'params[:callback]' corresponds to 'http://<server_address>/<(..)>/<rails_route>.js?callback=<local_js_callback_Fcn>'
      end
      
    end
  end
  
end
