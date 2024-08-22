class Api::V1::RoutesController < ApplicationController
  def index
    if request.post?
      if params[:params].present?
        json_from_front = params.require(:data).permit!.to_h
        render json:hogehoge(json_from_front)
      else
        render json: {error: 'parameter missing'}, status: :bad_request
      end
    else
      render json:{error: 'must to use post method'}, status: :bad_request
    end

  end

  private def hogehoge(json_from_front)
    json_from_front
  end
end
