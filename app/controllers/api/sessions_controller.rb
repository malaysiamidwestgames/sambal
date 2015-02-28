class Api::SessionsController < ApplicationController
  def create
    check_params
    user = User.find_by(email: params[:email].downcase)
    if user && user.authenticate(params[:password])
      create_token(user)
      render json: user
       if user.activated?
        log_in user
        params[:session][:remember_me] == '1' ? remember(user) : forget(user)
        redirect_back_or user
      else
        message  = "Account not activated. "
        message += "Check your email for the activation link."
        flash[:warning] = message
        redirect_to root_url
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
