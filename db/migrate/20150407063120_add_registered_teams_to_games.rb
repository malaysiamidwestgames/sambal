class AddRegisteredTeamsToGames < ActiveRecord::Migration
  def change
    add_column :games, :spots_left, :integer
  end
end
