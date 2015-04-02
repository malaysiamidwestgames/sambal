class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.integer :min_players_per_team, null: false
      t.integer :max_players_per_team, null: false
      t.integer :price_per_team, null: false
      t.integer :min_players_on_court, null: false
      t.integer :max_players_on_court, null: false
      t.integer :kms_to_finish
      t.integer :points_to_finish
      t.integer :sets_to_finish
      t.integer :minutes_per_half
      t.integer :max_teams, null:false
      t.string :venue, null:false
      t.string :tournament_type, null: false
      t.integer :tournaments_id, unique: true

      t.timestamps null: false
    end
  end
end
