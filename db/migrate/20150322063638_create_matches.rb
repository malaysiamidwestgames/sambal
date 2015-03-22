class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|
        t.datetime "created_at", 
            null: false
        t.datetime "updated_at", 
            null: false
        t.string  "team_1",
            null: false
        t.string  "team_2",
            null: false
        t.string  "winner"
        t.datetime "start_at",
            null: false
    end
  end
end
