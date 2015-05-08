class CommentSerializer < ActiveModel::Serializer
  attributes :id, :post_id, :message, :created_at, :user
end