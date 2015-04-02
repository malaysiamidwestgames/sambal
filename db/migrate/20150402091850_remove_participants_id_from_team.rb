class RemoveParticipantsIdFromTeam < ActiveRecord::Migration
  def change
    remove_column :teams, :participants_id
  end
end
