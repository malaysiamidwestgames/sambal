class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :size
      t.integer :price
      t.string :comments
      
      t.timestamps null: false
    end
  end
end
