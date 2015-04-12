class AddParticipantsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :participants_id, :integer
  end
end
