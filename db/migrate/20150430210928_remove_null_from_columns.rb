class RemoveNullFromColumns < ActiveRecord::Migration
  def change
    change_column_null :tournaments, :games_id, true
    change_column_null :tournaments, :tournament_type, true
    change_column_null :tournaments, :current_round, true
    change_column_null :universities, :name, true
    change_column_null :users, :email, true
    change_column_null :users, :first_name, true
    change_column_null :users, :last_name, true
    change_column_null :users, :university_id, true
    change_column_null :users, :password_digest, true
  end
end
