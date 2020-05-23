Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  


  
  namespace :api, defaults: {format: :json} do
    post :googleauth, to: "users#googleauth"
    resources :users, only: [:create, :index]
    resource :session, only: [:create, :destroy]
    resources :bills do
      resources :comments, only: [:create, :index, :destroy]
      resources :payments, only: [:create, :index]
    end
    resources :friendships, only: [:create, :destroy, :index]

  end
  
  root "static_pages#root"
end

