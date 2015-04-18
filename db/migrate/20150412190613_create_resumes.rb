class CreateResumes < ActiveRecord::Migration
  def change
    create_table :resumes do |t|
      t.integer :opportunity
      t.string :month
      t.integer :year
      t.string :major
      t.string :image_uid
      t.string :image_name

      t.timestamps null: false
    end
  end
end
