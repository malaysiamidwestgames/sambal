class CreateTournaments < ActiveRecord::Migration
  def change
    create_table :tournaments do |t|
      t.integer :games_id
      t.string :tournament_type
      t.integer :current_round
      t.integer :matches_id

      t.timestamps null: false
    end
  end
end
