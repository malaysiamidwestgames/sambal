class ApplicationController < ActionController::API
  include SessionsHelper
  include AuthorizationHelper
  include ActionController::Cookies
  # http://stackoverflow.com/questions/26192463/active-model-serializers-not-working-in-rails-api
  include ActionController::Serialization
end
