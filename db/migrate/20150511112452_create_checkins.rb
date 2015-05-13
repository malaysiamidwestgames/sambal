class CreateCheckins < ActiveRecord::Migration
  def change
    create_table :checkins do |t|
      t.integer :user_id
      t.integer :checkin_event_id

      t.timestamps null: false
    end
  end
end
