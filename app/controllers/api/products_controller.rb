class Api::ProductsController < ApplicationController
  def index
    @product = Product.all
    render json: @product
  end
end
