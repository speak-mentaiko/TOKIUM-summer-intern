Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :hello, only: [:index]
      resources :routes, only: [:index]
      post '/routes', to: 'routes#index'
    end

    namespace :v2 do
      resources :station, only: [:index]
      resources :routes, only: [:index]
      post '/routes', to: 'routes#index'
      namespace :routes do
        resources :lists, only: [:index]
        post 'lists', to: 'lists#index'
        get 'lists/:route_id', to: 'lists#route_id'
      end
    end
  end

end
