class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :regtype, :status, :transaction_id, :amount, :purchased_at, :user
  has_one :user
end
