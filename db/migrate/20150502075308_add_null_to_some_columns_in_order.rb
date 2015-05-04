class AddNullToSomeColumnsInOrder < ActiveRecord::Migration
  def change
    change_column_null :orders, :user_id, false
    change_column_null :orders, :product_id, false
    change_column_null :orders, :quantity, false
  end
end
