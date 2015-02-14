class UserMailer < ApplicationMailer
  default from: "testingmidwestgames@gmail.com"

  
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.account_activation.subject
  #
  def account_activation(user)
    @user = user

    mail(to: @user.email,
         subject: 'Account activation',
         template_path: 'user_mailer',
         template_name: 'account_activation')

  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.password_reset.subject
  #
  def password_reset
    @greeting = "Hi"

    mail to: "to@example.org"
  end
end
