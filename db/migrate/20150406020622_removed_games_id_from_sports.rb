class RemovedGamesIdFromSports < ActiveRecord::Migration
  def change
    remove_column :sports, :games_id
    add_column :games, :sport_id, :integer
  end
end
