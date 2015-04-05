class Team < ActiveRecord::Base
  has_one :tournaments
  has_many :participants
  has_many :users, through: :participants
  belongs_to :game
  belongs_to :payment
end
