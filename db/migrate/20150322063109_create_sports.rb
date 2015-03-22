class CreateSports < ActiveRecord::Migration
  def change
    create_table :sports do |t|
        t.string :name

        t.timestamp null: false
    end
  end
end
