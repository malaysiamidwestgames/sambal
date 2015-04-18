class ParticipantSerializer < ActiveModel::Serializer
  attributes :id, :status, :user_id
  has_one :user
end
