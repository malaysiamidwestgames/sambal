class Api::ParticipantsController < ApplicationController
  def create
    @participant = Participant.new(participant_params)
    @participant.activation_key = @participant.generate_activation_key()
    @participant.status = "team_captain"
    if @participant.save
      render json: @participant, status: :created
    else
      render json: @participant.errors, status: :unprocessable_entity
    end
  end

  def join_team
    @participant = Participant.new(participant_params)
    @participant.update_attribute(:activation_key, @participant.generate_activation_key())
    @participant.status = "join_request"
    if @participant.save
      render json: @participant, status: :created
    else
      render json: @participant.errors, status: :unprocessable_entity
    end
  end

  def invite_team
    @participant = Participant.new(participant_params)
    @participant.activation_key = @participant.generate_activation_key()
    @participant.status = "invite_request"
    if @participant.save
      render json: @participant, status: :created
    else
      render json: @participant.errors, status: :unprocessable_entity
    end
  end

  def accept
    @participant = Participant.find(params[:id])
    if (params[:activation_key] == @participant.activation_key)
      @participant.update_attribute(:status, "accepted")
      if @participant.save
        render json: @participant, status: :created
      else
        render json: @participant.errors, status: :unprocessable_entity
      end
    else
      @participant.errors.add(:activation_key, "wrong activation_key!")
      @participant.activation_key = @participant.generate_activation_key()
      render json: @participant.errors, status: :unprocessable_entity
    end
  end

  def decline
    @participant = Participant.find(params[:id])
    if (params[:activation_key] == @participant.activation_key)
      @participant.update_attribute(:status, "declined")
      if @participant.save
        render json: @participant, status: :created
      else
        render json: @participant.errors, status: :unprocessable_entity
      end
    else
      @participant.errors.add(:activation_key, "wrong activation_key!")
      @participant.activation_key = @participant.generate_activation_key()
      render json: @participant.errors, status: :unprocessable_entity
    end
  end

  def get_team
    if userId = params[:user_id]
      @participants = Participant.where(user_id: userId).where('status=? OR status=?', "invite_request", "accepted")
      render json: @participants
    end
  end

  private
    def participant_params
      params.permit(:team_id, :user_id)
    end
end
