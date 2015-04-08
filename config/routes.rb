Rails.application.routes.draw do


  get 'password_resets/new'

  get 'password_resets/edit'

  resources :mailers, except: [:new, :edit]
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
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

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end


  namespace :api, defaults: { format: :json } do
    resources :users, except: [:new, :edit]
    get 'users/activations/:id' => 'users#resend_activation_email'
    resources :universities, only: [:index]
    resources :sports, only: [:index, :show]
    get 'games/sports/:id' => 'games#get_games_with_sport_id'
    resources :games, only: [:index, :show]
    get 'universities/count' => 'universities#count'
    resources :sessions, only: [:create]
    resources :account_activations, only: [:update]
    resources :teams, only: [:index, :create]
    resources :payments, only: [:create, :show, :index]
    resources :participants, only: [:create]
    post 'participants/join' => 'participants#join_team'
    post 'participants/invite' => 'participants#invite_team'
    post 'participants/accept' => 'participants#accept'
    post 'participants/decline' => 'participants#decline'
    get 'participants/get' => 'participants#get_team'
    resources :password_resets, only: [:new, :create, :edit, :update]
    delete '/sessions' => 'sessions#destroy'
    post '/payments/:id'=> 'payments#show'
    post '/hook' => 'payments#hook'
    get '/payupdate' => 'teams#update_payment'
    get '/outpay' => 'payments#retrieve_payment'
    get '/paybalance' => 'teams#retrieve_amount'
  end

  





end
