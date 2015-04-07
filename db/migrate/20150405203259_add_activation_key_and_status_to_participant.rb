class AddActivationKeyAndStatusToParticipant < ActiveRecord::Migration
  def change
    add_column :participants, :activation_key, :string
    add_column :participants, :status, :string
  end
end
