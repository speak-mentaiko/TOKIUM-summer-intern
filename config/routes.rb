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
      post '/costs/request', to: 'costs#cost_request'
      get '/costs/request/list/:user_id', to: 'costs#cost_list'
      get '/costs/list/:cost_id', to: 'costs#cost_more'
      post '/costs/approval', to: 'costs#cost_approval'
    end
  end

end
