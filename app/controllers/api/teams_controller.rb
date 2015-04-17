class Api::TeamsController < ApplicationController

  def create
    @team = Team.new(team_params)
    game = Game.find(@team.game_id)
    if game.spots_left > 0
      result = game.spots_left - 1
      game.update(spots_left: result)
      if @team.save
        @team.participants.create(user_id: @team.team_captain, status: 'team_captain')
        render json: @team, status: :created
      else
        render json: @team.errors, status: :unprocessable_entity
      end
    else
      render json: { message: 'Sorry! You cannot register ' + game.name + ' ' + game.category + ' because there are no spots left. Please try again later.' },
             status: :ok
    end
  end

  # GET /teams/1
  # GET /teams/1.json
  def show
    @team = Team.find(params[:id])
    render json: @team
  end

  def index
    @teams = Team.all
    if tournaments_id = params[:tournaments_id]
      @teams = Team.joins(:game).where(games: {id:tournaments_id})
    elsif payId = params[:payment_id]
      @teams = Team.where(payment_id: payId)
    end
    render json: @teams
  end

  def destroy_teams
    id = current_user.teams.where(payment_id: 0).game_id
    game = Game.find(id)
    result = game.spots_left + 1
    game.update(spots_left: result)
    current_user.teams.where(payment_id: 0).destroy_all
    render json: :status
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

  def find_team_with_team_captain
    @team = Team.where(team_captain: params[:team_captain]).where(game_id: params[:game_id])
    render json: @team
  end



  private

    def team_params
      params.permit(:name, :team_captain, :tournaments_id, :university_id, :ranking, :participants_id, :game_id, :payment_id)
    end
end
