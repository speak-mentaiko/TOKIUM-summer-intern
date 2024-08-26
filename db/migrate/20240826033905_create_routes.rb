class CreateRoutes < ActiveRecord::Migration[7.0]
  def change
    create_table :routes do |t|
      t.string :route_id, :null => false
      t.string :from, :null => false
      t.string :via0
      t.string :via1
      t.string :via2
      t.string :via3
      t.string :via4
      t.string :to, :null => false
      t.string :way
      t.integer :amount, :null => false
      t.integer :distans

      t.timestamps
    end
  end
end
