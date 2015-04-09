class Api::GamesController < ApplicationController
	#respond_to :json

  # GET /games
  # GET /games.json
	def index
		# Gather all games data
		@games = Game.all
		render json: @games
  end

  # GET /games/1
  # GET /games/1.json
  def show
    @game = Game.find(params[:id])
    render json: @game
  end

  # GET /games/1
  # GET /games/1.json
  def get_games_with_sport_id
    @game = Game.where(sport_id: params[:id])
    render json: @game
  end
end