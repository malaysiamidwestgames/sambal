class AddUniversityToTeam < ActiveRecord::Migration
  def change
    add_reference(:teams, :university)
    remove_column(:teams, :contingent)
  end
end
