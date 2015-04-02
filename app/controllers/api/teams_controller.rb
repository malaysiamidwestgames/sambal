class Api::TeamsController < ApplicationController

  def create
    @team = Team.new(team_params)
    if @team.save
      render json: @team, status: :created
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  def index
    @teams = Team.all
    if tournaments_id = params[:tournaments_id]
      @teams = Team.joins(:game).where(games: {id:tournaments_id})
    end
    render json: @teams
  end



  private

    def team_params
      params.permit(:name, :team_captain, :tournaments_id, :contingent, :ranking, :participants_id, :game_id, :payment_id)
    end
end
