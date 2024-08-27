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
        resources :list, only: [:index]
        post 'list', to: 'list#index'
        get 'list/:route_id', to: 'list#route'
      end
    end
  end

end
