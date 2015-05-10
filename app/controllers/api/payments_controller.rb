class Api::PaymentsController < ApplicationController
  before_action :signed_in_user, only: [:create, :show, :index, :retrieve_payment]
  before_action :admin_user, only: [:show]

  def create
    if payment_params[:user_id]
      @payment = User.find(payment_params[:user_id]).payments.build(payment_params)
    else
      @payment = current_user.payments.build(payment_params)
    end
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

  def index
    render json: current_user.payments
  end

  def hook
    params.permit!
    status = params[:payment_status]
    if status =="Completed"
      @payment = Payment.find(params[:invoice])
      @payment.update_attributes(notification_params: params, status: status, transaction_id: params[:txn_id], purchased_at: Time.now, regtype: params[:item_name], amount: params[:mc_gross])
    end
    render nothing: true
  end

  def retrieve_payment
    @payment = current_user.payments.where(regtype: "Sports registration", status: "Payment initiated")
    render json: @payment, root: false
  end

  private
    def payment_params
      params.permit(:notification_params, :status, :transaction_id, :purchased_at, :regtype, :user_id, :amount, :payment_type)
    end

end