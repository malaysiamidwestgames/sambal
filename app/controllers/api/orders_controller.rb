class Api::OrdersController < ApplicationController
  def create
    @order = Order.new(orders_param)

    if @order.save
      render json: @order, status: :created
    else
      render json: @order.error, status: :unprocessable_entity
    end
  end

  private

  def orders_param
    params.permit(:user_id, :product_id, :quantity)
  end
end
