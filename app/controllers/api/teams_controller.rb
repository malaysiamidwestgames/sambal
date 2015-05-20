class Api::TeamsController < ApplicationController
  before_action :signed_in_user, only: [:create, :cancel_unpaid_teams, :update_payment, :retrieve_amount]
  before_action :correct_user_id, only: [:cancel_unpaid_teams]
  before_action :correct_captain, only: [:create]

  def create
    @team = Team.new(team_params)
    total_teams = Team.where(:game_id => @team.game_id).count
    game = Game.find(@team.game_id)
    spots = game.max_teams - total_teams
    if spots > 0 && game.registration_open == true
      game.update(spots_left: spots)
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


  def cancel_unpaid_teams
    user = params[:id] == 'me' ? current_user : User.find(params[:id])
    teams = user.teams.where(payment_id: 0)
    for team in teams
      game = Game.find(team.game_id)
      total_teams = Team.where(:game_id => team.game_id).count
      spots = game.max_teams - total_teams
      game.update(spots_left: spots)
    end
    teams.destroy_all
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

    def correct_user(key)
      if !current_user.admin? && params[key] != 'me' && params[key] != current_user.id
        render json: { message: 'Admin only' }, status: :forbidden
      end
    end

    def correct_user_id
      correct_user :id
    end

    def correct_captain
      correct_user :team_captain
    end

    def team_params
      permit = params.permit(:name, :team_captain, :tournaments_id, :university_id, :ranking, :participants_id, :game_id, :payment_id)
      if permit[:team_captain] == 'me'
        permit[:team_captain] = current_user.id
      end
      return permit
    end
end
