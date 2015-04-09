class Participant < ActiveRecord::Base
  belongs_to :user
  belongs_to :team
  attr_accessor :activation_key


  def self.new_token
    SecureRandom.urlsafe_base64
  end

  def self.digest(token)
    Digest::SHA1.hexdigest(token.to_s)
  end

  def self.generate_activation_key
    Participant.digest(Participant.new_token)
  end
end
