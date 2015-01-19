class MailersController < ApplicationController
  # GET /mailers
  # GET /mailers.json
  def index
    @mailers = Mailer.all

    render json: @mailers
  end

  # GET /mailers/1
  # GET /mailers/1.json
  def show
    @mailer = Mailer.find(params[:id])

    render json: @mailer
  end

  # POST /mailers
  # POST /mailers.json
  def create
    @mailer = Mailer.new(mailer_params)

    if @mailer.save
      render json: @mailer, status: :created, location: @mailer
    else
      render json: @mailer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /mailers/1
  # PATCH/PUT /mailers/1.json
  def update
    @mailer = Mailer.find(params[:id])

    if @mailer.update(mailer_params)
      head :no_content
    else
      render json: @mailer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /mailers/1
  # DELETE /mailers/1.json
  def destroy
    @mailer = Mailer.find(params[:id])
    @mailer.destroy

    head :no_content
  end

  private
    
    def mailer_params
      params[:mailer]
    end
end
