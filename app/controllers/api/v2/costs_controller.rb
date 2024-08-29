require 'securerandom'

class Api::V2::CostsController < ApplicationController

  def cost_list
    (render json: {error: "Detected Unauthorized access"}, status:  :forbidden and return)unless User.where(user_id: params[:user_id]).any?
    list = Cost.where(user_id: params[:user_id])
    cost_list = []

    list.each do |x|
      cost = {cost_id: x.cost_id, user_id: x.user_id, date:x.date, visit:x.visit}
      cost_list.push(cost)
    end
    render json: { status: 'SUCCESS', data: list }
  end

  def cost_more

    cost = Cost.find_by(cost_id: params[:cost_id])
    if cost
      render json: { status: 'SUCCESS', data: cost }
    else
      render json: { status: 'ERROR', data: "No data"}
    end
  end

  def cost_request
    (render json: {error: "method error"}, status:  :bad_request and return)if request.method == "GET"
    cost = Cost.new(_get_cost_params)
    cost.cost_id = SecureRandom.uuid
    (render json: {error: "Detected Unauthorized access"}, status:  :forbidden and return)unless  User.where(user_id: cost[:user_id]).any?
    if cost.save
      render json: { status: 'SUCCESS', data: cost }
    else
      render json: { status: 'ERROR', data: cost.errors }
    end
  end

  def cost_approval
    @temp = User.where(part: "pvt")
    @user_info = @temp.where(user_id: params[:approval_user_id])
    (render json: {error: "Detected Unauthorized access"}, status:  :forbidden and return)if @user_info.empty?
    approval_data = _get_approval_params
    cost = Cost.find_by(cost_id: approval_data["cost_id"])
      cost.approval_user_id = approval_data["approval_user_id"]
      cost.approval_status = approval_data["approval_status"]
      cost.approval_date = approval_data["approval_date"]
      cost.approval_message = approval_data["approval_message"]
      if cost.save
        render json: { status: 'SUCCESS', data: cost }
      else
        render json: { status: 'ERROR', data: cost.errors }
      end
  end

  private

  def _get_cost_params
    params.require(:cost).permit(:cost_id, :user_id, :date, :visit, :ca, :route_from, :route_via0, :route_via1, :route_via2, :route_via3, :route_via4, :route_to, :route_way, :route_amount, :memo, :approval_user_id, :approval_status, :approval_date, :approval_message)
  end

  def _get_approval_params
    params.require(:cost).permit(:cost_id, :user_id, :approval_user_id, :approval_status, :approval_date, :approval_message)
  end
end