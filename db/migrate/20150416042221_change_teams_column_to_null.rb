class ChangeTeamsColumnToNull < ActiveRecord::Migration
  def change
    change_column :teams, :payment_id, :integer, null: false
    change_column :teams, :game_id, :integer, null: false
  end
end
