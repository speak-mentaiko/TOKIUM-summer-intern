# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_08_26_033905) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "costs", force: :cascade do |t|
    t.string "cost_id", null: false
    t.string "user_id", null: false
    t.date "date", null: false
    t.string "visit", null: false
    t.string "ca", null: false
    t.string "route_from", null: false
    t.string "route_via0"
    t.string "route_via1"
    t.string "route_via2"
    t.string "route_via3"
    t.string "route_via4"
    t.string "route_to", null: false
    t.string "route_way"
    t.integer "route_amount", null: false
    t.text "memo"
    t.string "approval_use_id", null: false
    t.string "approval_status", null: false
    t.date "approval_date", null: false
    t.text "approval_massage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "routes", force: :cascade do |t|
    t.string "route_id", null: false
    t.string "from", null: false
    t.string "via0"
    t.string "via1"
    t.string "via2"
    t.string "via3"
    t.string "via4"
    t.string "to", null: false
    t.string "way"
    t.integer "amount", null: false
    t.integer "distans"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end
end
