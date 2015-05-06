class RemoveColumnsFromVolunteer < ActiveRecord::Migration
  def change
    remove_column :volunteers, :preference
    remove_column :volunteers, :sleeve_size
  end
end
