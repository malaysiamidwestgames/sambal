class TestController < ApplicationController

	def test
		UserMailer.welcome_email().deliver_now
	end
end
