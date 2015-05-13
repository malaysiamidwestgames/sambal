class AddColumnsToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :payment_id, :integer
    add_column :users, :diet, :string
    add_column :users, :allergies, :string
  end
end
