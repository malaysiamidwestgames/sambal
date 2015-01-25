class AddUniversityToUsers < ActiveRecord::Migration
  def change
    add_column :users, :university, :string
  end
end
