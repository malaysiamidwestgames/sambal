class AddAuthorizationLevelFromUsers < ActiveRecord::Migration
  def change
    add_column :users, :authorization_level, :integer, default: 0
  end
end
