class UserMailer < ApplicationMailer
 default from: 'sohchienmin@gmail.com'

	def welcome_email()
	
		mail(to: 'sysofwan@umich.edu' ,subject: 'Welcome')

	end

end
