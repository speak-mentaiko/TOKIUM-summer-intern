class CreateCosts < ActiveRecord::Migration[7.0]
  def change
    create_table :costs do |t|
      t.string :cost_id
      t.string :user_id
      t.date :date
      t.string :visit
      t.string :ca
      t.string :route_from
      t.string :route_via0
      t.string :route_via1
      t.string :route_via2
      t.string :route_via3
      t.string :route_via4
      t.string :route_to
      t.string :route_way
      t.string :route_amount
      t.text :memo
      t.string :approval_user_id
      t.string :approval_status
      t.date :approval_date
      t.text :approval_message

      t.timestamps
    end
  end
end
