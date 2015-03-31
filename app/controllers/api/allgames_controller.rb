class Api::AllgamesController < ApplicationController
	#respond_to :json

	def index
		# Gather all games data
		@games = Game.all
		render json: @games
	end
end
