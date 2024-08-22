require 'net/http'
require 'json'

module Route
  class RouteController < ApplicationController
    def index
      render json: {"hello world"}
    end

    private def get_startstation(coordinates)
      _get_station(coordinates, 0)
    end

    private def get_endstation(coordinates)
      _get_station(coordinates, -1)
    end

    private def _get_station(coordinates, str)
      coordinate = coordinates[str]
      uri = URI.parse('https://api.odpt.org')
      # URI.parseは、URIオブジェクトを生成するメソッドです。
      http_client= Net::HTTP.new(uri.host,uri.port)
      # HTTPクライアントを生成し、引数にホスト名とポート番号を指定しています。
      get_request = Net::HTTP::Get.new("/api/v4/places/odpt:Station?lon=#{coordinate[:longitude]}&lat=#{coordinate[:latitude]}&radius=100&acl:consumerKey=vaxzrcqrf97s5u7nea3a980wlpb7pbi4hmh6z4n13w50t7tnvgwv3lsqxcs9ty4w", 'Content-Type' => 'application/json')
      # Net::HTTP::Getは、HTTPのGETリクエストを表すクラスです。
      # 引数にリクエストするpathとヘッダーを指定しています。
      http_client.use_ssl = true
      # httpsで通信をする場合はuse_sslをtrueにする必要がある
      response = http_client.request(get_request)
      # requestメソッドの引数にNet:HTTP:Responseオブジェクトをあたえます。
      # responseには、HTTPレスポンスが格納されている
      station_data = JSON.parse(response.body)
      return station_data[0]['odpt:stationTitle']
    end
  end
end
