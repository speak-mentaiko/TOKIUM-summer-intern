module Api
    module V2
        class StationController < ApplicationController
            def index
                render json:{message: 'hello'}
            end
        end
    end
end