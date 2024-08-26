class Api::V2::CostsController < ApplicationController
  before_action :_get_cost_id, only: [:show_cost]
  before_action :_get_user_id, only: [:cost_list]

  def cost_list
    cost_list = []
    @list.each do |x|
      cost = {cost_id: x.cost_id, user_id: x.user_id, date:x.date, visit:x.visit}
      cost_list.push(cost)
    end
    render json: { status: 'SUCCESS', data: cost_list }
  end

  def show_cost
    if @cost
      render json: { status: 'SUCCESS', data: @cost }
    else
      render json: { status: 'ERROR', data: "No data"}
    end
  end

  def create
    cost = Cost.new(_get_params)
    if cost.save
      render json: { status: 'SUCCESS', data: cost }
    else
      render json: { status: 'ERROR', data: cost.errors }
    end
  end

  private

  def _get_cost_id
    @cost = Cost.find_by(cost_id: params[:cost_id])
  end

  def _get_user_id
    @list = Cost.where(user_id: params[:user_id])
  end

  def _get_params
    params.require(:cost).permit(:cost_id, :user_id, :date, :visit, :ca, :route_from, :route_via0, :route_via1, :route_via2, :route_via3, :route_via4, :route_to, :route_way, :route_amount, :memo, :approval_user_id, :approval_status, :approval_date, :approval_message)
  end
end