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

  def update_payment
    @teams = current_user.teams.where(payment_id: 0)
    if payId = params[:payment_id]
      @teams.update_all(payment_id: payId)
    end
    render json: @teams
  end


  def retrieve_amount
    @teams = current_user.teams.where(payment_id: 0)
    @amount = 0
    @teams.each do |team|
      @amount += team.game.price_per_team
    end
    render json: @amount
  end





  private

    def team_params
      params.permit(:name, :team_captain, :tournaments_id, :contingent, :ranking, :participants_id, :game_id, :payment_id)
    end
end
