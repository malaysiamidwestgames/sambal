class Tournament < ActiveRecord::Base
  has_many :teams, through: :matches
end
