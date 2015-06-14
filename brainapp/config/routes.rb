Brainapp::Application.routes.draw do
  resources :posts
  
  ####################################################################
  
  
  					## OLD TEF EXPERIMENTD BELOW ##
  					
  # custom routes
  #match 'new_fork' => "Forks#new"
  
  # adv custom routes
  # For using : <%= link_to "All Forks", all_forks_path %>
  #match 'all' => "Forks#index", :as => "all_forks"
  
  # named routes
  #match 'forks' => "Forks#index"
  #match 'users' => "Users#index"
  
  # redirect
  #match 'allforks' => redirect('/forks')
  #match 'devtwitter' => "http://www.twitter.com/StephaneAG/"
  
  # route params
  # For using : <%= link_to "StephaneAG", user_forks_path('StephaneAG') %>
  #match ':name' => 'Forks#index', :as => 'user_forks'
  
  
  ###################################################################

  get "home/index"
  
  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # TEF EDIT BELOW > to set "root" action to the "index" action of the "home" controller
  root :to => 'home#index' # working, basic one
  #root :to => 'posts#index' # working, instead of starting on the '/home/inde.html.erb' file, we arrive at '/posts/index.html.erb'
  
  ### Tef Edit: added on 04/04/2013 to test the ajax-autocomplete (..) ##
  match 'ajaxsearch' => 'home#ajaxsearch'
  ### Tef Edit: added on 14/04/2013 to be able to directly delete a post from the results of the ajax-autocomplete (..) ##
  #match '/posts/:id/destroy' => 'posts#destroy', :via => 'delete' # >> don't work > ask Sam how he 'd have done it (..) / > I used 'data-confirm="Are you sure?" data-method="delete" rel="nofollow"' in the html instead ( > confirm ;p)
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  
  

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
