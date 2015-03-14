class Api::UniversitiesController < ApplicationController
	#respond_to :json

	def index

		# Gather all university data

		@universities = University.all
		render json: @universities
		# Respond to request with university data in json format
		#respond_with(universities) do |format|
		#	format.json{ render :json => universities.as_json}
		#end

	end
end
