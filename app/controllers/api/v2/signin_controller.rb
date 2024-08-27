class Api::V2::SigninController < ApplicationController
  def index
    data_arr_raw = params[:_json]

    if data_arr_raw.is_a?(Array)
      sign_data = data_arr_raw.first
    elsif data_arr_raw.is_a?(Hash)
      sign_data = data_arr_raw
    else
      render json: { error: "Invalid JSON data" }, status: 400 and return
    end

    @user = User.find_by(email: sign_data["email"])

    if @user && @user.authenticate(sign_data["password"])
      render json: {
        user_id: @user.user_id
      }, status: 200
    else
      render json: { error: "Invalid email or password" }, status: 400
    end
  end
end
