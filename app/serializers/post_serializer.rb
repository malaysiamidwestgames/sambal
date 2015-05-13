class PostSerializer < ActiveModel::Serializer
  attributes :id, :message, :created_at, :user
  has_many :comments
  has_many :likes
end
