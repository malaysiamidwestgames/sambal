class RemoveUserLevelFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :user_level, :integer
  end
end
