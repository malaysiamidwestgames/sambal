class Team < ActiveRecord::Base
  has_one :tournaments
  has_many :participants_id
end
