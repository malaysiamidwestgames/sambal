class CreateSports < ActiveRecord::Migration
  def change
    create_table :sports do |t|
      t.string :name
      t.integer :games_id

      t.timestamps null: false
    end
  end
end
