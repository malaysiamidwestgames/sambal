class RemovePaymentTypeFromPayments < ActiveRecord::Migration
  def change
    remove_column :payments, :payment_type
  end
end
