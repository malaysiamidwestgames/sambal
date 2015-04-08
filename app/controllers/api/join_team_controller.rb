class Api::JoinTeamController < ApplicationController
  #respond_to :json

  def create
    # Gather all sports data
    @participant = Participant.new(participant_params)

    if @participant.save
      render json: @participant, status: :created
    else
      render json: @participant.errors, status: :unprocessable_entity
    end
  end

  private

    def participant_params
      params.require(:teamid)
      params.require(:userid)
    end
end
