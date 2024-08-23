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
        via_stations << _get_station_only_for_via(route)
      end

      if via_stations.empty?
        inf = {from: from, to: to}
      else
        inf = {from: from, via: via_stations,to: to}
      end

      if inf
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
    dist_arr = []
    reduced_json = []
    for i in 1..data_arr.length-3
      dist_arr.push(_hubeny(data_arr[i]["longitude"], data_arr[i]["latitude"],data_arr[i+1]["longitude"],data_arr[i+1]["latitude"]))
    end
    i = 0
    while i < dist_arr.length - 2
      if dist_arr[i+1] <= 500
        reduced_json << data_arr[i]
        while dist_arr[i] <= 50
          i += 1
        end
      else
        i+=1
      end
    end
    return reduced_json
  end

# ヒュベニの公式
  def _hubeny(lat1, lng1, lat2, lng2)
    # 指定測地系の赤道半径・極半径を設定
    lat1 *= Math::PI / 180.0
    lat2 *= Math::PI / 180.0
    lng1 *= Math::PI / 180.0
    lng2 *= Math::PI / 180.0
    r_x = 6378137.000000
    r_y = 6356752.314245
    # 2点の経度の差を計算 ( ラジアン )
    a_x = lng1 - lng2
    # 2点の緯度の差を計算 ( ラジアン )
    a_y = lat1 - lat2
    # 2点の緯度の平均を計算
    p = ( lat1 + lat2 ) / 2.0
    # 離心率を計算
    e = Math::sqrt( ( r_x ** 2 - r_y ** 2 ) / ( r_x ** 2 ) )
    # 子午線・卯酉線曲率半径の分母Wを計算
    w = Math::sqrt( 1 - ( e ** 2 ) * ( ( Math::sin( p ) ) ** 2 ) )
    # 子午線曲率半径を計算
    m = r_x * ( 1 - e ** 2 ) / ( w ** 3 )
    # 卯酉線曲率半径を計算
    n = r_x / w
    # 距離を計算
    d = ( a_y * m ) ** 2
    d += ( a_x * n * Math.cos( p ) ) ** 2
    d = Math::sqrt( d )
    return d
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
      temp = _reform_json(station_data)
      return temp
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
      temp = _reform_json(station_data)
      return temp
    end
  end

  def _reform_json(coodinates)
    return coodinates = []? nil : ["response"]["station"][0]["name"]
  end

end
