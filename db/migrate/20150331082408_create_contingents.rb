class CreateContingents < ActiveRecord::Migration
  def change
    create_table :contingents do |t|
      t.string :name
      t.integer :teams_id
      t.integer :leader_id
      t.integer :points

      t.timestamps null: false
    end
  end
end
