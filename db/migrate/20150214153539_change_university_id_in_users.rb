class ChangeUniversityIdInUsers < ActiveRecord::Migration
  def up
    change_column :users, :university, :integer
  end

  def down
    change_column :users, :university, :string
  end
end
