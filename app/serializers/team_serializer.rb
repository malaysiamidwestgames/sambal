class TeamSerializer < BaseSerializer
  attributes :id, :team_captain, :name, :payment_id, :team_payment_status, :is_member,
             :is_captain, :gravatar_hex, :invite_pending, :request_pending, :participant_id,
             :team_exceed_member
  has_one :captain, serializer: UserSerializer
  has_one :game
  has_one :university
  has_many :participants
  has_many :messages

  protect_attrs :is_member, attrs: [:payment_id, :team_payment_status, :participants, :messages]
  protect_attrs :is_team_participant, attrs: [:participant_id]

  def is_member
    object.is_member?(current_user)
  end

  def participant_id
    idx = object.participants.index do |participant|
      participant.user == current_user
    end
    if idx
      return object.participants[idx].id
    end
  end

  def is_team_participant
    return participant_id != nil
  end

  def is_captain
    object.is_captain?(current_user)
  end

  def invite_pending
    object.is_invited?(current_user)
  end

  def request_pending
    object.is_requested?(current_user)
  end

  def gravatar_hex
    Digest::MD5::hexdigest(object.captain.email)
  end
end
