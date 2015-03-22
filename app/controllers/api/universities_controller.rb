class Api::UniversitiesController < ApplicationController
	#respond_to :json

	def index
		# Gather all university data
		@universities = University.all
		render json: @universities
	end

	def count
		university_counts = University.joins(:user).group("universities.name").count
		list = []
		university_counts.each { |name, count|  list << {name: name, count: count}}
		render json: list
	end
end
