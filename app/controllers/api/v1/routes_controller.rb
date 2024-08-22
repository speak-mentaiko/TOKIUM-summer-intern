class Api::V1::RoutesController < ApplicationController
  def index
    post = Route.new(routes_params)

    if post.save
      render json: post, status: :created
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def routes_params
    params.require(:route).permit(:start, :end)
  end
end
