class AddColumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :phone_number, :string
    add_column :users, :volunteer_id, :integer
  end
end
