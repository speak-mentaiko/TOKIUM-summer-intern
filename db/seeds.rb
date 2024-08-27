# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'securerandom'

# Clear existing data
Route.delete_all

# Example stations and ways for generating routes
stations = [
  "Shinjuku Station",
  "Shibuya Station",
  "Tokyo Station",
  "Akihabara Station",
  "Ikebukuro Station",
  "Yokohama Station",
  "Osaka Station",
  "Nagoya Station",
  "Kyoto Station",
  "Kobe Station"
]

ways = ["bus", "train", "walk"]

# Number of routes to generate
num_routes = 50

num_routes.times do
  from_station = stations.sample
  to_station = (stations - [from_station]).sample # Ensure 'to' station is different from 'from' station
  via_stations = (stations - [from_station, to_station]).sample(5) # Sample up to 5 via stations

  Route.create!(
    route_id: SecureRandom.uuid,
    from: from_station,
    via0: via_stations[0],
    via1: via_stations[1],
    via2: via_stations[2],
    via3: via_stations[3],
    via4: via_stations[4],
    to: to_station,
    way: ways.sample,
    amount: rand(100..1000), # Random amount between 100 and 1000
    distans: rand(500..5000) # Random distance between 500 and 5000
  )
end