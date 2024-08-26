require 'net/http'
require 'json'
require 'open-uri'
require 'nokogiri'
require 'uri'

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
        temp = _get_station(route)
        if !(via_stations.last == temp) && !(from == temp) && !(to == temp)
          via_stations << temp
        end
      end

      distance = get_distance(data_arr)
      costs = get_cost(from, via_stations, to)
      if via_stations.empty?
        inf = {from: from, to: to, amount: nil, distance: 0}
      elsif from.nil?
        inf = {error: "unprocessable request"}
      else
        inf = {from: from, via: via_stations,to: to, amount: costs, distance: distance}
      end
      render json: inf, status: :created
    else
      render json: { errors: "method error" }, status: :bad_request
    end
  end

  private
  def detect_transfer(data_arr)
    key_dist = 100
    reduced_json = []
    i = -1
    while i < data_arr.length-3 && i +=1
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
    _get_station(coordinates[0])
  end

  def get_tostation(coordinates)
    _get_station(coordinates[-1])
  end
  
  def _get_station(coordinate)
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
      return station_data["response"]["station"][0]["name"]
    end
  end

  def get_distance(coordinates)
    total_distance = 0
    for i in 0..coordinates.length-2
      total_distance = total_distance + _hubeny(coordinates[i]["latitude"], coordinates[i]["longitude"], coordinates[i+1]["latitude"], coordinates[i+1]["longitude"])
    end
    return (total_distance/1000).round(2)
  end

  def get_cost(from, via_stations, to)
    base_url = 'https://www.jorudan.co.jp/norikae/cgi/nori.cgi?'
    from_station = from
    to_station = to
    if via_stations.empty?
      via_station_num = 0
    else
      via_station_num = via_stations.length
    end


    case via_station_num-1
    when -1
      ad_url = "eki1=#{CGI.escapeHTML(from_station)}&eki2=#{CGI.escapeHTML(to_station)}&S=#{CGI.escapeHTML("検索")}"
    when 0
      ad_url = "eki1=" + URI.encode_www_form_component(from_station) +
        "&eki2=" + URI.encode_www_form_component(to_station) +
        "&via_on=" + (via_station_num - 1).to_s +
        "&eki3=" + URI.encode_www_form_component(via_stations[0]) +
        "&eki4=&eki5=&eki6=&Cway=0&Cfp=1&Czu=2&S=" + URI.encode_www_form_component("検索") + "&Csg=1"
    when 1
      ad_url = "eki1=" + URI.encode_www_form_component(from_station) +
        "&eki2=" + URI.encode_www_form_component(to_station) +
        "&via_on=" + (via_station_num - 1).to_s +
        "&eki3=" + URI.encode_www_form_component(via_stations[0]) +
        "&eki4=" + URI.encode_www_form_component(via_stations[1]) +
        "&eki5=&eki6=&Cway=0&Cfp=1&Czu=2&S=" + URI.encode_www_form_component("検索") + "&Csg=1"

    when 2
      ad_url = "eki1=" + URI.encode_www_form_component(from_station) +
        "&eki2=" + URI.encode_www_form_component(to_station) +
        "&via_on=" + (via_station_num - 1).to_s +
        "&eki3=" + URI.encode_www_form_component(via_stations[0]) +
        "&eki4=" + URI.encode_www_form_component(via_stations[1]) +
        "&eki5=" + URI.encode_www_form_component(via_stations[2]) +
        "&eki6=&Cway=0&Cfp=1&Czu=2&S=" + URI.encode_www_form_component("検索") + "&Csg=1"
    else
      ad_url = "eki1=" + URI.encode_www_form_component(from_station) +
        "&eki2=" + URI.encode_www_form_component(to_station) +
        "&via_on=" + (via_station_num - 1).to_s +
        "&eki3=" + URI.encode_www_form_component(via_stations[0]) +
        "&eki4=" + URI.encode_www_form_component(via_stations[1]) +
        "&eki5=" + URI.encode_www_form_component(via_stations[2]) +
        "&eki6=" + URI.encode_www_form_component(via_stations[3]) +
        "&Cway=0&Cfp=1&Czu=2&S=" + URI.encode_www_form_component("検索") + "&Csg=1"
    end

    url = (base_url + ad_url)
    res = URI.open(url)
    body = res.read
    charset = res.charset
    html = Nokogiri::HTML.parse(body, nil, charset)

    s1 =html.css('div.data_line_1').css('dd').css('b')
    return s1[0].text
  end
end
