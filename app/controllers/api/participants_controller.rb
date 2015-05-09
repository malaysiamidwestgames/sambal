class Api::ParticipantsController < ApplicationController
  def create
    @participant = Participant.new(participant_params_2)
    if @participant.save
      render json: @participant, status: :created
    else
      render json: @participant.errors, status: :unprocessable_entity
    end
  end

  def create_team
    @participant = Participant.new(participant_params.merge(status: "team_captain"))
    if @participant.save
      render json: @participant, status: :created
    else
      render json: @participant.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @participant = Participant.find(params[:id])
    if @participant.status == 'team_captain'
      @participant.destroy_all
      head :no_content
    elsif
    render json: { message: 'can\'t unregister, please contact an admin' },
           status: :bad_request
    end
  end

  def join_team
    @participant = Participant.new(user_id: current_user.id, team_id: params['team_id'])
    @participant.status = "join_request"
    if @participant.save
      render json: @participant, status: :created
    else
      render json: @participant.errors, status: :unprocessable_entity
    end
  end

  def invite_team
    invited_user = User.find_by! email: params['email']
    @participant = Participant.new(user_id: invited_user.id, team_id: params['team_id'])
    @participant.status = "invite_request"
    if @participant.save
      render json: @participant, status: :created, root: false
    else
      render json: @participant.errors, status: :unprocessable_entity
    end
  end

  def accept
    @participant = Participant.find(params[:id])
    @participant.update_attribute(:status, "accepted")
    if @participant.save
      render json: @participant, status: :created
    else
      render json: @participant.errors, status: :unprocessable_entity
    end
  end

  def decline
    @participant = Participant.find(params[:id])
    @participant.update_attribute(:status, "declined")
    if @participant.save
      render json: @participant, status: :created
    else
      render json: @participant.errors, status: :unprocessable_entity
    end
  end

  def get_team
    @participant = Participant.where(user_id: current_user.id).where(status: ['accepted','team_captain'])
    render json: @participant
  end

  def get_invitations
    @participant = Participant.where(user_id: current_user.id, status: 'invite_request')
    render json: @participant
  end

  def check_if_user_is_participating
    @participant = Participant.where(user_id: params[:user_id]).where(team_id: params[:team_id])
    render json: @participant
  end

  private
    def participant_params_2
      params.permit(:user_id, :team_id, :status)
    end

    def participant_params
      params.permit(:team_id, :user_id)
    end
end
