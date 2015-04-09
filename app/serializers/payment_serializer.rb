class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :regtype, :status, :transaction_id, :amount, :purchased_at
  has_one :user
  has_many :teams
end
