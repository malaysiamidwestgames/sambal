class Api::ResumesController < ApplicationController
	def create
    @resumes = Resume.new(resume_params)
    if @resumes.save
      render json: {success: true}
    else
     render json: @resumes.errors
    end  
  end  

  def index
    # Gather all resume data
    @resumes = Resume.all
    render json: @resumes
  end

 private 
    def resume_params
      params.require(:resume).permit(:opportunity, :month, :year, :major, :image)
    end 
 
end
