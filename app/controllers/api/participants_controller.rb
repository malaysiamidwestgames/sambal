class Api::ParticipantsController < ApplicationController
  def create
    @participant = Participant.new(participant_params)
    if @participant.save
      render json: @participant, status: :created
    else
      render json: @participant.errors, status: :unprocessable_entity
    end
  end

  private
    def participant_params
      params.permit(:team_id, :user_id)
    end
end
