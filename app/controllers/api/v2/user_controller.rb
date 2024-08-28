class Api::V2::UserController < ApplicationController
  def index
    (render json: {error: "Detected Unauthorized access"}, status:  :forbidden and return)unless User.where(user_id: params[:user_id]).any?
    user = User.where(user_id: params[:user_id]).first
    inf = {
      name: user.name,
      part: user.part
    }
    render json:inf, status: 200 and return

  end
end
