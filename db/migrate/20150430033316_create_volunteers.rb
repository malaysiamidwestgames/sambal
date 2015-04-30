class CreateVolunteers < ActiveRecord::Migration
  def change
    create_table :volunteers do |t|
      t.integer :user_id
      t.string :preference

      t.timestamps null: false
    end
  end
end
