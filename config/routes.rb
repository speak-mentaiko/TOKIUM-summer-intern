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
      resources :costs
      post '/routes', to: 'routes#index'
      get '/costs', to: 'costs#index'
      post '/costs/request', to: 'costs#create'
      get '/costs/list/:cost_id', to: 'costs#show'
    end
  end

end
