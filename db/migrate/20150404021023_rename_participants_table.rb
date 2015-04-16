class RenameParticipantsTable < ActiveRecord::Migration
  def change
    rename_column(:participants, :teams_id, :team_id)
    rename_column(:participants, :users_id, :user_id)
  end
end
