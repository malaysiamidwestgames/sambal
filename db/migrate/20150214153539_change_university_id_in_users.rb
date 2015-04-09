class ChangeUniversityIdInUsers < ActiveRecord::Migration
  def up
    remove_column :users, :university, :string
    add_column :users, :university, :integer
  end

  def down
    remove_column :users, :university, :integer
    add_column :users, :university, :string
  end
end
