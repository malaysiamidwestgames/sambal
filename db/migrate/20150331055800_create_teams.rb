class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :name, null: false
      t.integer :team_captain, null: false
      t.integer :tournaments_id, null: false
      t.integer :contingent
      t.integer :ranking
      t.integer :participants_id, null: false

      t.timestamps null: false
    end
  end
end