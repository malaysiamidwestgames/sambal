class Team < ActiveRecord::Base
  has_many :participants, dependent: :destroy
  has_many :users, through: :participants
  has_many :messages
  belongs_to :tournament
  belongs_to :game
  belongs_to :payment
  belongs_to :university
  belongs_to :captain, class_name: User, foreign_key: 'team_captain'

  def team_captain_name
    captain = self.team_captain
    @teamleader = User.where(id: captain)
    return @teamleader
  end


  def team_payment_status
    self.payment.regtype == 'Sports registration' && self.payment.status == 'Completed'
  end
end
