class Api::MessagesController < ApplicationController

  def create
    @message = Message.new(messages_params)
    if @message.save
      render json: @message, status: :created, root: false
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  def index
    @messages = Message.all
    if team = params[:team_id]
      @messages = Message.where(team_id: team)
    end
    render json: @messages
  end

  private

    def messages_params
      params.permit(:user_id, :team_id, :message)
    end
end
