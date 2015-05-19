class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy, :resend_activation_email, :user_teams, :user_payments]
  before_action :signed_in_user, only: [:index, :update, :show, :destroy, :user_teams, :user_payments]
  before_action :correct_user, only: [:update, :show, :user_teams, :user_payments]
  before_action :admin_user, only: [:index, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
    if name = params[:name]
      @users = User.joins(:university).where(universities: {name: name})
    end
    render json: @users
  end

  # GET /users/1
  # GET /users/1.json
  def show
    render json: @user
  end

  # POST /users
  # POST /users.json
  def create
    university = University.find_or_initialize_by(name: university_params)
    user_params.merge(university: university)
    if current_user.authorization_level == 'admin'
      user_params.merge(authorization_level: params[:authorization_level])
    else
      user_params.merge(authorization_level: 0)
    end
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
      @user.send_activation_email
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    university = University.find_or_initialize_by(name: university_params)
    if params[:payments] == "delete" and current_user.authorization_level == 'admin'
      @user.update(payments: [])
    end

    if @user.update(user_params.merge(university: university))
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    head :no_content
  end

  def user_teams
    render json: @user.teams, root: 'teams', each_serializer: TeamSerializer
  end

  def user_payments
    render json: @user.payments, root: 'payments', each_serializer: PaymentSerializer
  end

  def resend_activation_email
    @user.regenerate_activation_digest
    @user.send_activation_email
  end

  private

    def user_params
      if current_user.authorization_level == 'admin'
        params.permit(:email, :first_name, :last_name, :password, :password_confirmation)
      else
        params.permit(:email, :first_name, :last_name, :password, :password_confirmation)
      end
    end

    def university_params
      params.require(:university)
    end

    def set_user
        @user = params[:id] == 'me' ? current_user : User.find(params[:id])
    end
end
