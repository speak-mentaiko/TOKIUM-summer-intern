class Api::V2::CostsController < ApplicationController
  before_action :_get_id, only: [:show]
  def show
    render json: { status: 'SUCCESS', data: @cost }
  end

  def create
    cost = Cost.new(_get_params)
    #render json: {text:cost}
    if cost.save
      render json: { status: 'SUCCESS', data: cost }
    else
      render json: { status: 'ERROR', data: cost.errors }
    end
  end

  private

  def _get_id
    @cost = Cost.find(params[:cost_id])
  end

  def _get_params
    params.require(:cost).permit(:cost_id, :user_id, :date, :visit, :ca, :route_from, :route_via0, :route_via1, :route_via2, :route_via3, :route_via4, :route_to, :route_way, :route_amount, :memo, :approval_user_id, :approval_status, :approval_date, :approval_message)
  end
end