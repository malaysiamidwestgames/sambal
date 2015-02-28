class FixColumnName < ActiveRecord::Migration
  def change
    rename_column :users, :university, :university_id
  end
end
