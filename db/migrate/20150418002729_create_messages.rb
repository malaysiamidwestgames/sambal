class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.references :user, index: true
      t.references :team, index: true
      t.string :message

      t.timestamps null: false
    end
    add_foreign_key :messages, :users
    add_foreign_key :messages, :teams
  end
end
