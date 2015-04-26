class AddNullToImportantColumns < ActiveRecord::Migration
  def change
    change_column_null :contingents, :name, false
    change_column_null :games, :name, false
    change_column_null :games, :sport_id, false
    change_column_null :games, :category, false
    change_column_null :messages, :user_id, false
    change_column_null :messages, :team_id, false
    change_column_null :messages, :message, false
    change_column_null :sports, :name, false
    change_column_null :sports, :venue, false
    change_column_null :tournaments, :games_id, false
    change_column_null :tournaments, :tournament_type, false
    change_column_null :tournaments, :current_round, false
    change_column_null :universities, :name, false
    change_column_null :users, :email, false
    change_column_null :users, :first_name, false
    change_column_null :users, :last_name, false
    change_column_null :users, :university_id, false
    change_column_null :users, :password_digest, false
  end
end
