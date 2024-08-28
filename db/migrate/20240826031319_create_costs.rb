class CreateCosts < ActiveRecord::Migration[7.0]
  def change
    create_table :costs do |t|
      t.string :cost_id, :null => false
      t.string :user_id, :null => false
      t.date :date, :null => false
      t.string :visit, :null => false
      t.string :ca, :null => false
      t.string :route_from, :null => false
      t.string :route_via0
      t.string :route_via1
      t.string :route_via2
      t.string :route_via3
      t.string :route_via4
      t.string :route_to, :null => false
      t.string :route_way
      t.integer :route_amount, :null => false
      t.text :memo
      t.string :approval_use_id, :null => false
      t.string :approval_status, :null => false
      t.date :approval_date, :null => false
      t.text :approval_massage

      t.timestamps
    end
  end
end
