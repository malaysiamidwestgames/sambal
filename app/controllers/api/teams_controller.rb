class Api::TeamsController < ApplicationController

  def create
    @team = Team.new(team_params)
    if @team.save
      render json: @team, status: :created
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  private

    def team_params
      params.permit(:name, :team_captain, :tournaments_id, :contingent, :ranking, :participants_id)
    end
end
