class Api::PaymentsController < ApplicationController
  #respond_to :json
  #protect_from_forgery except: :hook

  def create
    @payment = Payment.new(payment_params)
    if @payment.save
      render json: @payment, status: :created, root: false
    else
      render json: @payment.errors, status: :unprocessable_entity
    end
  end

  def show
    @payment = Payment.find(params[:id])
    render json: @payment
  end

  def hook
    params.permit!
    status = params[:payment_status]
    if status =="Completed"
      @payment = Payment.find(params[:invoice])
      @payment.update_attributes(notification_params: params, status: status, transaction_id: params[:txn_id], purchased_at: Time.now, regtype: params[:item_name])
    end
    render nothing: true
  end

  private
    def payment_params
      params.permit(:notification_params, :status, :transaction_id, :purchased_at, :regtype)
    end

end