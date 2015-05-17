class ParticipantSerializer < BaseSerializer
  attributes :id, :status, :user_id, :team_id
  has_one :user
end
