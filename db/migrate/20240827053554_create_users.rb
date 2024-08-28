class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :user_id
      t.string :name
      t.string :password_digest
      t.string :project
      t.string :part
      t.string :email

      t.timestamps
    end
  end
end
