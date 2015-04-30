class User < ActiveRecord::Base
  attr_accessor :remember_token, :activation_token, :reset_token
  enum authorization_level: { regular: 0, admin: 1, contingent_leader: 2 }
  before_save { self.email = email.downcase }
  before_create :create_access_token, :create_activation_digest
  has_many :payments
  has_many :participants
  has_many :teams, through: :participants
  has_many :messages
  has_many :products, through: :orders
  has_many :orders, dependent: :destroy
  belongs_to :university
  belongs_to :volunteer

  VALID_EMAIL_REGEX = /\A[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+\z/

  validates :email, presence: true, uniqueness: { case_sensitive: false },
                    format: { with: VALID_EMAIL_REGEX }
  validates :password, length: { minimum: 6 }, :on => :create

  has_secure_password

  def self.new_access_token
    SecureRandom.urlsafe_base64
  end

  def self.digest(token)
    Digest::SHA1.hexdigest(token.to_s)
  end

  # Activates an account.
  def activate
    update_attribute(:activated, true)
  end

  def volunteer_status
    idx = self.payments.index do |payment|
      payment.regtype == 'General registration' && payment.status == 'Completed'
    end
    return idx != nil
  end

  def registration_payment_status
    idx = self.payments.index do |payment|
      payment.regtype == 'General registration' && payment.status == 'Completed'
    end
    return idx != nil
  end

  def sports_payment_unpaid
    idx = self.payments.index do |payment|
      payment.regtype == 'Sports registration' && payment.status == 'Payment initiated'
    end
    return idx != nil
  end

  def sports_payment_status
    idx = self.payments.index do |payment|
      payment.regtype == 'Sports registration' && payment.status == 'Completed'
    end
    return idx != nil
  end

  def sports_payment_uninit
    idx = self.teams.index do |team|
      team.payment_id == 0
    end
    return idx != nil
  end

  # Sends activation email.
  def send_activation_email
    UserMailer.account_activation(self).deliver_now
  end

  def regenerate_activation_digest
    self.activation_token  = User.new_token
    update_attribute(:activation_digest,  User.digest(activation_token))
  end

  def User.new_token
    SecureRandom.urlsafe_base64
  end

  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  def create_reset_digest
    self.reset_token = User.new_token
    update_attribute(:reset_digest,  User.digest(reset_token))
    update_attribute(:reset_sent_at, Time.zone.now)
  end

  def send_password_reset_email
    UserMailer.password_reset(self).deliver_now
  end

  def password_reset_expired?
    reset_sent_at < 2.hours.ago
  end

  private

    def create_access_token
      self.access_token = User.digest(User.new_access_token)
    end

    def create_activation_digest
      self.activation_token  = User.new_token
      self.activation_digest = User.digest(activation_token)
    end

end
