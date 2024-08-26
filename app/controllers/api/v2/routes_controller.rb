require 'net/http'
require 'json'

class Api::V2::RoutesController < ApplicationController
  def index
    via_stations = []
    if request.post?
      data_arr = params[:_json]
      if data_arr.empty?
        render json: {errors: "empty error"}
      end
      from = get_fromstation(data_arr)
      to = get_tostation(data_arr)
      course_data = detect_transfer(data_arr)

      course_data.each do |route|
        temp = _get_station_only_for_via(route)
        if !(via_stations.last == temp) && !(from == temp) && !(to == temp)
          via_stations << temp
        end
      end

      if via_stations.empty?
        inf = {from: from, to: to, amount: nil, distance: 0}
      else
        inf = {from: from, via: via_stations,to: to, amount: nil, distance: 0}
      end

      if 1
        render json: inf, status: :created
      else
        render json: { errors: "error" }, status: :unprocessable_entity
      end

    elsif request.get?
      render json: { errors: "method error" }, status: :bad_request
    end
  end

  private
  def detect_transfer(data_arr)
    key_dist = 100
    reduced_json = []
    total_distance = 0
    for i in 1..data_arr.length-3
      reduced_json << data_arr[i]
      while _hubeny(data_arr[i]["latitude"], data_arr[i]["longitude"],data_arr[i+1]["latitude"],data_arr[i+1]["longitude"]) <= key_dist && i <= data_arr.length-3
        i += 1
      end
    end

    return reduced_json
  end

# ヒュベニの公式
  def _hubeny(lat1, lng1, lat2, lng2)
    p = ( lat1 + lat2 ) * 0.00872664625
    w = Math::sqrt( 1 - (0.00669437998  * ( ( Math::sin( p ) ) ** 2 )) )
    return Math::sqrt(( (lat1 - lat2) * 110574.275759 / ( w ** 3 ) ) ** 2 + ( (lng1 - lng2) *111319.49073 / w * Math.cos( p ) ) ** 2)
  end
  def get_fromstation(coordinates)
    _get_station(coordinates, 0)
  end

  def get_tostation(coordinates)
    _get_station(coordinates, -1)
  end

  def _get_station(coordinates, str)
    coordinate = coordinates[str]
    uri = URI.parse('https://express.heartrails.com')
    # URI.parseは、URIオブジェクトを生成するメソッドです。
    http_client= Net::HTTP.new(uri.host,uri.port)
    # HTTPクライアントを生成し、引数にホスト名とポート番号を指定しています。
    get_request = Net::HTTP::Get.new("/api/json?method=getStations&x=#{coordinate[:longitude]}&y=#{coordinate[:latitude]}", 'Content-Type' => 'application/json')
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
      return station_data["response"]["station"][0]["name"]
    end
  end
  def _get_station_only_for_via(coordinate)
    uri = URI.parse('https://express.heartrails.com')
    # URI.parseは、URIオブジェクトを生成するメソッドです。
    http_client= Net::HTTP.new(uri.host,uri.port)
    # HTTPクライアントを生成し、引数にホスト名とポート番号を指定しています。
    get_request = Net::HTTP::Get.new("/api/json?method=getStations&x=#{coordinate["longitude"]}&y=#{coordinate["latitude"]}", 'Content-Type' => 'application/json')
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
      # return _reform_json(station_data)
      # sleep(1)
      return station_data["response"]["station"][0]["name"]
    end
  end

  def _reform_json(coodinates)
    return coodinates = []? nil : [0]
  end

end
