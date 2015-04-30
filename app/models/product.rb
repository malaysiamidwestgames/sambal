class Product < ActiveRecord::Base
  has_one :order
end