class AddColumnToGames < ActiveRecord::Migration
  def change
    add_column :games, :registration_open, :boolean
    add_column :games, :live_draw, :boolean
    add_column :games, :live_draw_session, :datetime
  end
end
