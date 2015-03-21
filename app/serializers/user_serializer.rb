class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :university, :first_name, :last_name, :admin
end
