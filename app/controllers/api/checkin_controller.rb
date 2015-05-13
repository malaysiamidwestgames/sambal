class Api::CheckinController < ApplicationController
  before_action :admin_user

  def create
    if params.has_key? :checkin_event_id
      @checkin = Checkin.new(permit_params)
    else
      event = CheckinEvent.where('start_time <= ?', Time.now)
                        .where('end_time >= ?', Time.now)
      if event.size == 1
        @checkin = Checkin.new({user_id: params[:user_id], checkin_event_id: event[0].id})
      else
        render json: { message: 'Unable to determine checkin event' }, status: :unprocessable_entity
        return
      end
    end
    if @checkin.save
      render json: @checkin, status: :created
    else
      render json: @checkin.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @checkin = Checkin.find(params[:id])
    @checkin.destroy
    head :no_content
  end

  private

  def permit_params
    params.permit(:user_id, :checkin_event_id)
  end
end