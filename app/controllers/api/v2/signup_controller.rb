require 'securerandom'
require 'json'
require 'net/http'

class Api::V2::SignupController < ApplicationController
  def index
    render json: { error: "no role are attached" }, status: 400
  end

  def role
    data_arr_raw = get_params
    role_data = params[:role]

    # Handle both array and hash formats
    if data_arr_raw.is_a?(Array)
      sign_data = data_arr_raw.first
    elsif data_arr_raw.is_a?(Hash)
      sign_data = data_arr_raw
    else
      render json: { error: "Invalid JSON data" }, status: 400 and return
    end

    if User.where(email: sign_data[:email]).empty?
      @user = User.new(
        user_id: SecureRandom.uuid,
        name: sign_data[:name],
        email: sign_data[:email],
        password: sign_data[:password],
        password_confirmation: sign_data[:password_confirmation],
        project: sign_data[:project],
        part: role_data
      )
      if @user.save
        render json: { user_id: @user.user_id}, status: 201
      else
        render json: { error: @user.errors.full_messages }, status: 422
      end
    else
      render json: { error: "Your email address has already registered" }, status: 409
    end
  end

  private

  def get_params
    { email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation], name: params[:name], project: params[:project], part: params[:part]}
  end
end
