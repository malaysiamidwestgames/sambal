class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
        t.string   "name", 
            null: false
        t.datetime "created_at", 
            null: false
        t.datetime "updated_at", 
            null: false
        t.integer  "university_id"
        t.integer  "player_id",
            null: false
    end
  end
end
