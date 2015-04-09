class CreateParticipant < ActiveRecord::Migration
  def change
    create_table :participants do |t|
      t.integer :users_id, null: false
      t.integer :teams_id, null: false

      t.timestamps null: false
    end
  end
end
