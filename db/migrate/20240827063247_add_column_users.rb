class AddColumnUsers < ActiveRecord::Migration[7.0]
  def up
    add_column :routes, :user_id, :string
  end
  def down
    remove_column :routes, :user_id
  end
end
