class Api::CheckinEventController < ApplicationController
  before_action :admin_user

  def index
    render json: CheckinEvent.all
  end

  def create
    @event = CheckinEvent.new(permit_params)
    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: CheckinEvent.find(params[:id])
  end

  def update
    @event = CheckinEvent.find(params[:id])
    if @event.update(permit_params)
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @event = CheckinEvent.find(params[:id])
    @event.destroy
    head :no_content
  end

  private

  def permit_params
    params.permit(:name, :start_time, :end_time)
  end
end