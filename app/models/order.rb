class Order < ActiveRecord::Base
  belongs_to :user
  has_many :products

  validates :quantity, numericality: { greater_than: 0 }, :on => :create
end