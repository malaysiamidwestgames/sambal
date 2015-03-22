class CreateTournaments < ActiveRecord::Migration
  def change
    create_table :tournaments do |t|
        t.string   "name"
        t.datetime "created_at",
            null: false
        t.datetime "updated_at",
            null: false
        t.integer  "team_id"
        t.boolean  "isLeague",
            null: false,
            default: false
        t.integer  "size",
            null: false
        t.integer  "match_ids"
    end
  end
end
