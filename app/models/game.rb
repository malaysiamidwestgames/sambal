class Game < ActiveRecord::Base
    belongs_to :sports
    has_many :teams
end
