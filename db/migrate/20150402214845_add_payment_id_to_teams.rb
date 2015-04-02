class AddPaymentIdToTeams < ActiveRecord::Migration
  def change
    add_reference(:teams, :payment)
  end
end
