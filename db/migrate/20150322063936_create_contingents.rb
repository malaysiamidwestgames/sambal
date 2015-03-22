class CreateContingents < ActiveRecord::Migration
  def change
    create_table :contingents do |t|
        t.string "name",
            null: false
        t.integer "team_id",
            null: false
    end
  end
end
