class RemoveNullFromColumns < ActiveRecord::Migration
  def change
    change_column_null :users, :authorization_level, true
  end
end
