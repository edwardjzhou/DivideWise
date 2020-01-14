Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    # resources :benches, only: [:index, :show, :create]
    # resources :reviews, only: [:create]
    # resource :user, only: [:create]
    # resource :session, only: [:create, :destroy, :show]
    # resource :favorites, only: [:create, :destroy]
    resources :users, only: [:create, :index]
    resource :session, only: [:create, :destroy]
    resources :bills do
      resources :comments, only: [:create, :destroy]
      resources :payments, only: [:create, :index]
    end
    resources :friendships, only: [:create, :destroy, :index]

  end
  
  root "static_pages#root"
end
