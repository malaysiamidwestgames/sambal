class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.integer :tournaments_id, null: false
      t.integer :games_id, null: false
      t.integer :round, null: false
      t.integer :team1_id, null: false
      t.integer :team2_id, null: false
      t.integer :winner
      t.integer :team1_score, null: false
      t.integer :team2_score, null: false
      t.datetime :start_at, null: false
      t.string :venue
      t.integer :stats_id, null: false

      t.timestamps null: false
    end
  end
end
