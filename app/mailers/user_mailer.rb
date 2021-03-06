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
  def password_reset(user)

    @user = user

    mail(to: @user.email,
         subject: 'Password Reset',
         template_path: 'user_mailer',
         template_name: 'password_reset.html.erb')

  end

  def custom_template_mailer(user, subject, template_name)
    mail(to: user.email,
         subject: subject,
         template_path: 'user_mailer',
         template_name: template_name)
  end
end
