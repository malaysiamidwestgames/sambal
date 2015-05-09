class MessageSerializer < BaseSerializer
  attributes :id, :message, :created_at
  has_one :user
end
