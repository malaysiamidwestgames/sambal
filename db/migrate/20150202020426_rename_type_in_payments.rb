class RenameTypeInPayments < ActiveRecord::Migration
  def change
    rename_column :payments, :type, :regtype
  end
end
