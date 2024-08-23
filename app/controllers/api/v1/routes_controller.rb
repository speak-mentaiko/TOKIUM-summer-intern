require 'net/http'
require 'json'

class Api::V1::RoutesController < ApplicationController
  def index
    if request.post?
      data_arr = params[:_json]

      from = get_fromstation(data_arr)
      to = get_tostation(data_arr)
      inf = {from: from, to: to}
      if data_arr
        render json: inf, status: :created
      else
        render json: { errors: "error" }, status: :unprocessable_entity
      end
    elsif request.get?
      render json: { errors: "method error" }, status: :bad_request
    end

  end

  private

  def get_fromstation(coordinates)
    _get_station(coordinates, 0)
  end

  def get_tostation(coordinates)
    _get_station(coordinates, -1)
  end

  def _get_station(coordinates, str)
    coordinate = coordinates[str]
    uri = URI.parse('https://api.odpt.org')
    # URI.parseは、URIオブジェクトを生成するメソッドです。
    http_client= Net::HTTP.new(uri.host,uri.port)
    # HTTPクライアントを生成し、引数にホスト名とポート番号を指定しています。
    get_request = Net::HTTP::Get.new("/api/v4/places/odpt:Station?lon=#{coordinate[:longitude]}&lat=#{coordinate[:latitude]}&radius=100&acl:consumerKey=#{ENV['CONSUMER_KEY']}", 'Content-Type' => 'application/json')
    # Net::HTTP::Getは、HTTPのGETリクエストを表すクラスです。
    # 引数にリクエストするpathとヘッダーを指定しています。
    http_client.use_ssl = true
    # httpsで通信をする場合はuse_sslをtrueにする必要がある
    response = http_client.request(get_request)
    # requestメソッドの引数にNet:HTTP:Responseオブジェクトをあたえます。
    # responseには、HTTPレスポンスが格納されている
    station_data = JSON.parse(response.body)
    if station_data.empty?
      return nil
      else
      return station_data[0]['odpt:stationTitle']
    end

    end
end
