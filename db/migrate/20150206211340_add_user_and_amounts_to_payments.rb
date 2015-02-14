class AddUserAndAmountsToPayments < ActiveRecord::Migration
  def change
    add_reference :payments, :user
    add_column :payments, :amount, :integer
  end
end
