class Order < ActiveRecord::Base
  belongs_to :user
  belongs_to :product

  validates :quantity, numericality: { greater_than: 0 }, :on => :create
end