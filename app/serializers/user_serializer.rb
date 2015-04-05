class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :university, :first_name, :last_name, :authorization_level, :registration_payment_status, :sports_payment_unpaid
end
