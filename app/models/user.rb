class User < ActiveRecord::Base
  before_save { self.email = email.downcase }
  before_create :create_access_token

  VALID_EMAIL_REGEX = /\A[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+\z/

  validates :email, presence: true, uniqueness: { case_sensitive: false }, 
                    format: { with: VALID_EMAIL_REGEX }
  validates :password, length: { minimum: 6 }

  has_secure_password

  def self.new_access_token
    SecureRandom.urlsafe_base64
  end

  def self.digest(token)
    Digest::SHA1.hexdiugest(token.to_s)
  end

  private

    def create_access_token
      self.access_token = User.digest(User.new_access_token)
    end
end
