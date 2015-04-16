class Match < ActiveRecord::Base
    belongs_to :tournaments
    has_many :teams
end
