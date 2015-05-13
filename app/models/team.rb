class Team < ActiveRecord::Base
  has_many :participants, dependent: :destroy
  has_many :users, through: :participants
  has_many :messages
  belongs_to :tournament
  belongs_to :game
  belongs_to :payment
  belongs_to :university
  belongs_to :captain, class_name: User, foreign_key: 'team_captain'

  def is_member?(user)
    idx = self.participants.index do |participant|
      participant.user == user && (participant.status == 'team_captain' || participant.status == 'accepted')
    end
    return idx != nil
  end

  def is_captain?(user)
    self.captain == user
  end

  def is_invited?(user)
    idx = self.participants.index do |participant|
      participant.user == user && participant.status == 'invite_request'
    end
    return idx != nil
  end

  def is_requested?(user)
    idx = self.participants.index do |participant|
      participant.user == user && participant.status == 'join_request'
    end
    return idx != nil
  end

  def is_participant?(user)
    idx = self.participants.index do |participant|
      participant.user == current_user
    end
    return idx != nil
  end


  def team_payment_status
    self.payment != nil && self.payment.regtype == 'Sports registration' && self.payment.status == 'Completed'
  end
end
