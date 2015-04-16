class DeleteActivationKeyFromParticipant < ActiveRecord::Migration
  def change
    remove_column :participants, :activation_key
  end
end
