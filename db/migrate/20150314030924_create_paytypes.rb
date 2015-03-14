class CreatePaytypes < ActiveRecord::Migration
  def change
    create_table :paytypes do |t|
      t.string :payment_type
      t.integer :quantity
      t.references :payment, index: true

      t.timestamps null: false
    end
    add_foreign_key :paytypes, :payments
  end
end
