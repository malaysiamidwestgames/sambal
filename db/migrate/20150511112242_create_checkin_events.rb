class CreateCheckinEvents < ActiveRecord::Migration
  def change
    create_table :checkin_events do |t|
      t.string :name
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps null: false
    end
  end
end
