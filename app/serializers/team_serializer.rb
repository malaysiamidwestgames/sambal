class TeamSerializer < BaseSerializer
  attributes :id, :team_captain, :name, :payment_id, :team_captain_name, :team_payment_status, :is_member, :is_captain, :gravatar_hex, :invite_pending, :request_pending
  has_one :captain, serializer: UserSerializer
  has_one :game
  has_one :university
  has_many :participants
  has_many :messages

  protect_attrs :is_member, attrs: [:payment_id, :team_payment_status, :participants, :messages]

  def is_member
    idx = object.participants.index do |participant|
      participant.user == current_user && (participant.status == 'team_captain' || participant.status == 'accepted')
    end
    return idx != nil
  end

  def is_captain
    object.captain == current_user
  end

  def invite_pending
    idx = object.participants.index do |participant|
      participant.user == current_user && participant.status == 'invite_request'
    end
    return idx != nil
  end

  def request_pending
    idx = object.participants.index do |participant|
      participant.user == current_user && participant.status == 'join_request'
    end
    return idx != nil
  end

  def gravatar_hex
    Digest::MD5::hexdigest(object.captain.email)
  end
end
