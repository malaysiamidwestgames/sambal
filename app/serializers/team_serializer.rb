class TeamSerializer < ActiveModel::Serializer
  attributes :id, :team_captain, :name, :team_captain_name
  has_one :game
  has_one :payment
end
