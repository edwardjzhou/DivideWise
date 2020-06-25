Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do
    post :googleauth, to: "users#googleauth"
    get :info, to: "users#info"
    resources :users, only: [:create, :index]
    resource :session, only: [:create, :destroy]
    resources :payments, only: [:destroy, :update]
    resources :comments, only: [:destroy, :update]
    resources :bills do
      resources :comments, only: [:create, :index]
      resources :payments, only: [:create, :index]
    end
    resources :friendships, only: [:create, :destroy, :index]
  end
  
  root "static_pages#root"
end

