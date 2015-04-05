class Team < ActiveRecord::Base
  has_one :tournaments
  has_many :participants
  has_many :users, through: :participants
  belongs_to :game
  belongs_to :payment

  def team_captain_name
    captain = self.team_captain
    @teamleader = User.where(id: captain)
    return @teamleader
  end
end
