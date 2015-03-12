class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments do |t|
      t.text :notification_params
      t.string :status
      t.string :transaction_id
      t.datetime :purchased_at

      t.timestamps null: false
    end
  end
end
