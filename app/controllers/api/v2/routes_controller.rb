require 'net/http'
require 'json'
require 'open-uri'
require 'nokogiri'
require 'uri'

class Api::V2::RoutesController < ApplicationController
  def index
    if request.post?
      data_arr = params[:_json]
      if data_arr.empty?
        render json: {errors: "empty erroe"}
      end
      from = get_fromstation(data_arr)
      to = get_tostation(data_arr)
      #cost = getCosts(from , to)
      inf = {from: from, to: to}
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
      # return _reform_json(station_data)
      temp = _reform_json(station_data)
      return temp
    end
  end

  def _reform_json(coodinates)
    return coodinates["response"]["station"][0]["name"]
  end

  def getCosts(from, to)
    doc = Nokogiri::HTML(open("https://www.jorudan.co.jp/norikae/cgi/nori.cgi?eki1=#{URI.encode_www_form(q: from)}&eki2=#{URI.encode_www_form(q: to)}&S=検索"))
    cost = doc.xpath('//body/div[@id="container"]/div[@id="contents_out"]/div[@id="contentsdiv"]/div[@id="ain_wrapper"]/div[@id="js_routeBlocks"]/div[@id="data"]/div[@id="data_line_1"]/dl/dd/b')
    return cost
  end
end
