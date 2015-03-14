class Api::PasswordResetsController < ApplicationController
  before_action :get_user,         only: :update
  before_action :valid_user,       only: :update
  before_action :check_expiration, only: :update

  def new
  end

  def create
    @user = User.find_by(email: params[:email].downcase)
    if @user
      @user.create_reset_digest
      @user.send_password_reset_email

      render json: {message: "E-mail has been sent! Please check your e-mail."}
          
    else
      
      render json: {message: "E-mail does not exist. Please enter a valid e-mail."}, status: :bad_request
    end
  end

  def edit
  end

  def update
    if password_blank?

      render json: { message: "Password can't be blank" }, status: :bad_request
    elsif @user.update_attributes(user_params)
      render json: { message: "Password reset!" }

    else
      render json: { message: "failed" }, status: :bad_request
    end
  end

  private

    def user_params
      params.permit(:password, :password_confirmation)
    end

    # Returns true if password is blank.
    def password_blank?

      params[:password].blank?
      params[:password_confirmation].blank?
      
    end

    # Before filters

    def get_user
      @user = User.find_by(email: params[:email])
    end

    # Confirms a valid user.
    def valid_user
      unless (@user && @user.activated? && @user.reset_digest == User.digest(params[:id]))
        render json: { message: "unauthorized"}, status: :forbidden
      end
    end

    # Checks expiration of reset token.
    def check_expiration
      if @user.password_reset_expired?
        render json: { message: "Password reset has expired."}, status: :bad_request
      end
    end
end