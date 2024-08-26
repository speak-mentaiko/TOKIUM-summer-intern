require 'open-uri'
require 'nokogiri'
require 'csv'

url = 'https://www.jorudan.co.jp/norikae/cgi/nori.cgi?rf=top&eki1=%E6%B5%B7%E6%B5%9C%E5%B9%95%E5%BC%B5&Cmap1=&eki2=%E6%96%B0%E7%BF%92%E5%BF%97%E9%87%8E&S=%E6%A4%9C%E7%B4%A2'
res = URI.open(url)
body = res.read
charset = res.charset
html = Nokogiri::HTML.parse(body, nil, charset)

s1 =  html.css('div.data_line_1').css('dd').css('b')
puts s1[0].text
