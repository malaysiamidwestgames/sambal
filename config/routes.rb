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
    get 'users/:id/teams' => 'users#user_teams'
    get 'users/:id/payments' => 'users#user_payments'

    resources :sessions, only: [:create]
    resources :account_activations, only: [:update]

    resources :universities, only: [:index]
    resources :resumes, only: [:index, :create]
    get 'universities/count' => 'universities#count'

    resources :sports, only: [:index, :show]
    get 'games/sports/:id' => 'games#get_games_with_sport_id'
    resources :games, only: [:index, :show]

    resources :teams, only: [:index, :create, :show]
    delete '/teams/user/:id' => 'teams#cancel_unpaid_teams'

    resources :messages, only: [:index, :create]
    resources :volunteers, only: [:create]
    post 'teams/find_with_captain' => 'teams#find_team_with_team_captain'
    resources :payments, only: [:create, :show, :index]
    resources :participants, only: [:create, :destroy]
    post 'participants/join' => 'participants#join_team'
    post 'participants/invite' => 'participants#invite_team'
    get 'participants/get' => 'participants#get_team'
    get 'participants/get_invite' => 'participants#get_invitations'
    patch 'participants/accept/:id' => 'participants#accept'
    patch 'participants/decline/:id' => 'participants#decline'
    post 'participants/check' => 'participants#check_if_user_is_participating'
    resources :password_resets, only: [:new, :create, :edit, :update]

    
    # routes for Order
    get 'orders/create' => 'orders#create'

    # routes for Product
    resources :products, only: [:index]

    delete '/sessions' => 'sessions#destroy'
    post '/payments/:id'=> 'payments#show'
    post '/hook' => 'payments#hook'
    get '/payupdate' => 'teams#update_payment'
    get '/outpay' => 'payments#retrieve_payment'
    get '/paybalance' => 'teams#retrieve_amount'

    # routes for Checkins
    resources :checkin_event, only: [:create, :index, :show, :destroy]
    resources :checkin, only: [:create, :destroy]
  end







end
