class Api::VolunteersController < ApplicationController
  #respond_to :json

  def create
    @volunteer = Volunteer.new(volunteer_params)
    @user = User.find(@volunteer.user_id)

    if @volunteer.save
      if @user.update(phone_number: user_params[:phone_number], volunteer_id: @volunteer.id)
        render json: @volunteer, status: :created
      else
        render json: @volunteer.error, status: :unprocessable_entity
      end
    else
      render json: @volunteer.error, status: :unprocessable_entity
    end
  end

  private

  def volunteer_params
    params.permit(:user_id, :shirt_size)
  end

  def user_params
    params.permit(:phone_number)
  end
end
