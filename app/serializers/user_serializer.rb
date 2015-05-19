class UserSerializer < BaseSerializer
  attributes :id, :email, :university, :first_name, :last_name, :authorization_level, :registration_payment_status,
             :volunteer_status, :sports_payment_unpaid, :sports_payment_status, :sports_payment_uninit

  protect_attrs :correct_user,
                attrs: [:id, :email, :authorization_level, :registration_payment_status,
                        :sports_payment_unpaid, :sports_payment_status, :sports_payment_uninit]

  private

  def correct_user
    current_user == object # || current_user.admin?
  end
end
