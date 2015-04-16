class AddGameIdToTeams < ActiveRecord::Migration
  def change
    add_reference(:teams, :game)
  end
end
