class CreateRoutes < ActiveRecord::Migration[7.0]
  def change
    create_table :routes do |t|
      t.string :route_id
      t.string :from
      t.string :via0
      t.string :via1
      t.string :via2
      t.string :via3
      t.string :via4
      t.string :to
      t.string :way
      t.string :amount
      t.float :distance

      t.timestamps
    end
  end
end
