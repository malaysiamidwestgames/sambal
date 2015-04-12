class Team < ActiveRecord::Base
  has_one :tournaments
  has_many :participants
  has_many :users, through: :participants
  belongs_to :game
  belongs_to :payment
  belongs_to :university

  def team_captain_name
    captain = self.team_captain
    @teamleader = User.where(id: captain)
    return @teamleader
  end

  def team_payment_status
    idx = self.payment do |payment|
      payment.regtype == 'Sports registration' && payment.status == 'Completed'
    end
    return idx != nil
  end

  #def team_captain_present
  #  if self.team_captain == current_user.id
  #    true
  #  else
  #    false
  #  end
  #end
end
