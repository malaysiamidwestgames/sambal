class Api::SportsController < ApplicationController
	#respond_to :json

	def index
		# Gather all sports data
		@sports = Sport.all
		render json: @sports
  end

  def show
    @sport = Sport.find(params[:id])
    render json: @sport
  end
end
