class Api::SessionsController < ApplicationController
  def create
    check_params
    user = User.find_by(email: params[:email].downcase)
    if user && user.authenticate(params[:password])
       if user.activated?
        create_token(user)
        render json: user
      else
         render json: { user_id: user.id, message: 'Account not activated. Please check your email for activation link' },
             status: :forbidden
      end
    else
      render json: { message: 'incorrect username or password combination' },
             status: :bad_request
    end
  end

  def destroy
    destroy_token
    head :no_content
  end

  private

  def check_params
    params.require(:email)
    params.require(:password)
  end
end
