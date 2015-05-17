class ApplicationController < ActionController::API
  include SessionsHelper
  include AuthorizationHelper
  include ActionController::Cookies
  include ActionController::Serialization
end
