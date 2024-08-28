class Api::V2::ErrorsController < ApplicationController
  def mismatch_method
    render json: {error: "mismatch_method"}, status: 405 and return
  end
end
