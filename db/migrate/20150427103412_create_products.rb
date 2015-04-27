class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :size
      t.integer :quantity

      t.timestamps null: false
    end
  end
end
