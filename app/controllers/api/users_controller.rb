class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy, :resend_activation_email]
  # GET /users
  # GET /users.json
  def index
    @users = User.all

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
    @user = User.new(user_params.merge(university: university))

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
    @user = User.find(params[:id])

    if @user.update(user_params)
      render json: @user, status: :updated
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    head :no_content
  end

  def resend_activation_email
    @user.regenerate_activation_digest
    @user.send_activation_email
  end

  private
    
    def user_params
      params.permit(:email, :first_name, :last_name, :password, :password_confirmation)
    end

    def university_params
      params.require(:university)      
    end

    def set_user
      @user = params[:id] == 'me' ? current_user : User.find(params[:id])
    end

end
