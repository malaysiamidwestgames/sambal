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
    render json: @game
  end
end
