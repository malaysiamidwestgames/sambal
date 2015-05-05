class CreateVolunteers < ActiveRecord::Migration
  def change
    create_table :volunteers do |t|
      t.integer :user_id, null: false
      t.string :preference, null: false
      t.string :shirt_size, null: false
      t.string :sleeve_size, null: false

      t.timestamps null: false
    end
  end
end
