class Api::V2::Routes::ListController < ApplicationController
  def index
    unless request.post?
      routes = Route.select(:route_id, :from, :to)
      render json: routes.map { |route| { route_id: route.route_id, from: route.from, to: route.to } }
    else
      render json:{error: "method error"}, status: 400
    end
  end

  def route
    routes = Route.where(route_id: params[:route_id])
    if routes.any?
      render json: routes[0], status: 200
    else
      render json: { error: "No routes found with route_id #{params[:route_id]}" }, status: 404
    end
  end

  private

  def format_route(route)
    {
      route_id: route.route_id,
      from: route.from,
      via0: route.via0,
      via1: route.via1,
      via2: route.via2,
      via3: route.via3,
      via4: route.via4,
      to: route.to,
      way: route.way,
      amount: route.amount,
      distance: route.distance
    }
  end
end
