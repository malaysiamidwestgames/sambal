class AddUserLevelToUsers < ActiveRecord::Migration
  def change
    add_column :users, :user_level, :integer
  end
end
