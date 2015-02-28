# Handles user sessions
module SessionsHelper
  def create_token(user)
    access_token = User.new_access_token
    cookies[:access_token] = {
      value: access_token,
      expires: 1.hour.from_now
    }
    user.update_attribute(:access_token, User.digest(access_token))
    self.current_user = user
  end

  def destroy_token
    cookies.delete :access_token
    access_token = User.digest(request.headers[:HTTP_ACCESS_TOKEN])
    current_user.update_attribute(:access_token, User.digest(access_token))
    self.current_user = nil
  end

  attr_writer :current_user

  def authenticated?
    !current_user.nil?
  end

  def current_user
    access_token = User.digest(request.headers[:HTTP_ACCESS_TOKEN])
    @current_user ||= User.find_by(access_token: access_token)
  end

  #def current_user
   # if (user_id = session[:user_id])
    #  @current_user ||= User.find_by(id: user_id)
   # elsif (user_id = cookies.signed[:user_id])
    #  user = User.find_by(id: user_id)
    #  if user && user.authenticated?(:remember, cookies[:remember_token])
    #    log_in user
     #   @current_user = user
     # end
    #end
  #end
  
end
