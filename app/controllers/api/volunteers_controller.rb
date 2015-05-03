class Api::VolunteersController < ApplicationController
  #respond_to :json

  def create
    @volunteer = Volunteer.new(volunteer_params)
    @user = User.find(@volunteer.user_id)

    if @volunteer.save && @user.update(phone_number: user_params.phone_number)
      render json: @volunteer, status: :created
    else
      render json: @volunteer.error, status: :unprocessable_entity
    end
  end

  private

  def volunteer_params
    params.permit(:user_id, :shirt_size)
  end

  def user_params
    params.require(:phone_number)
  end
end
