class University < ActiveRecord::Base
  has_many :user
  has_many :teams
end
