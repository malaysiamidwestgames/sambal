class Api::AccountActivationsController < ApplicationController

  def update
    user = User.find_by(email: params[:email])
    if user && user.activation_digest == User.digest(params[:id])
      user.activate
      user.update_attribute(:activated, true)
      render json: { message: 'Account activation success!' }
    elsif user
      render json: { user_id: user.id, message: 'Account failed to activate' },
         status: :bad_request
    else
      render json: { message: 'Account failed to activate' },
             status: :bad_request
    end
  end


end
