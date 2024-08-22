class Api::V1::RoutesController < ApplicationController
  def index
    if params[:data].present?
      json_from_front = params.require(:data).permit!.to_h
      processed_json = hogehoge(json_from_front)
      render json: processed_json
    else
      render json: {error: 'parameter missing'}, status: :bad_request
    end
  end

  private def hogehoge(json_from_front)
    json_from_front
  end
end


