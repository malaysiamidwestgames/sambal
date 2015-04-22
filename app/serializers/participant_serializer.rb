class ParticipantSerializer < ActiveModel::Serializer
  attributes :id, :status, :user_id, :team_id
  has_one :user
end
