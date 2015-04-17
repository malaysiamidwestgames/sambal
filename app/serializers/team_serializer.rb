class TeamSerializer < ActiveModel::Serializer
  attributes :id, :team_captain, :name, :payment_id, :team_captain_name, :team_payment_status, :participants_name
  has_one :game
  has_one :university
  has_many :participants
end
