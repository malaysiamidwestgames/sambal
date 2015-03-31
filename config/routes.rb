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
    resources :allsports, only: [:index]
    resources :allgames, only: [:index]
    get 'universities/count' => 'universities#count'
    resources :sessions, only: [:create]
    resources :account_activations, only: [:update]
    resources :payments, only: [:create, :show, :index]
    resources :password_resets, only: [:new, :create, :edit, :update]
    delete '/sessions' => 'sessions#destroy'
    post '/payments/:id'=> 'payments#show'
    post '/hook' => 'payments#hook'
  end

  





end
