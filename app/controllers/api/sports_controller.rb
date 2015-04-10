class Api::SportsController < ApplicationController
	#respond_to :json

	def index
		# Gather all sports data
		@sports = Sport.all.order(name: :asc)
    if venue = params[:venue]
      @sports = Sport.where(venue: venue)
    end
		render json: @sports
  end

  def show
    @sport = Sport.find(params[:id])
    render json: @sport
  end
end
