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

      post '/signin', to: 'signin#index'
      get '/signin', to: 'errors#mismatch_method'

      post '/signup', to: 'signup#index'
      post '/signup/:role', to: 'signup#role'
      get '/signup', to: 'errors#mismatch_method'
      get '/signup/:role', to: 'errors#mismatch_role'

      namespace :routes do
        resources :list, only: [:index]
        post '/list', to: 'list#index'
        get '/list/:route_id', to: 'list#route'
      end
      post '/costs/request', to: 'costs#cost_request'
      get '/costs/request', to: 'errors#mismatch_method'

      get '/costs/request/list/:user_id', to: 'costs#cost_list'
      post '/costs/request/list/:user_id', to: 'errors#mismatch_method'

      get '/costs/list/:cost_id', to: 'costs#cost_more'
      post '/costs/list/:cost_id', to: 'errors#mismatch_method'

      post '/costs/approval', to: 'costs#cost_approval'
      get '/costs/approval', to: 'errors#mismatch_method'

      get '/user/:user_id', to: 'user#index'
      post '/user/:user_id', to: 'errors#mismatch_method'
    end
  end

end
