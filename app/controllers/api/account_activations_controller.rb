class Api::AccountActivationsController < ApplicationController

  
  def edit
    user = User.find_by(email: params[:email])
    if user && user.activation_digest == User.digest(params[:id])
      user.activate
      user.update_attribute(:activated, true)
      
    else

      puts "error"
      
    end
  end


end
