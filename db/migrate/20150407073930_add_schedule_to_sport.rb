class AddScheduleToSport < ActiveRecord::Migration
  def change
    add_column :sports, :schedule, :string
    add_column :sports, :venue, :string
  end
end
