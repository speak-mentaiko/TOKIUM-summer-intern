class Api::V2::CostsController < ApplicationController
  def cost_list
    list = Cost.where(user_id: params[:user_id])
    cost_list = []

    list.each do |x|
      cost = {cost_id: x.cost_id, user_id: x.user_id, date:x.date, visit:x.visit}
      cost_list.push(cost)
    end
    render json: { status: 'SUCCESS', data: cost_list }
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
    cost = Cost.new(_get_params)
    if cost.save
      render json: { status: 'SUCCESS', data: cost }
    else
      render json: { status: 'ERROR', data: cost.errors }
    end
  end

  def cost_approval
    approval_data = _get_approval_params
    cost = Cost.find_by(cost_id: approval_data.cost_id)
    cost.approval_user_id = approval_data.approval_user_id
    cost.approval_status = approval_data.approval_status
    cost.approval_date = approval_data.approval_date
    cost.approval_message = approval_data.approval_message
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