class Checkin < ActiveRecord::Base
  belongs_to :user
  belongs_to :checkin_event
  validates :checkin_event_id, presence: true
  validates :user_id, presence: true, uniqueness: {scope: :checkin_event_id}

  validates :user, presence: true
  validates :checkin_event, presence: true

  validate :user_registered

  def user_registered
    errors.add(:user, 'must pay for the event') if user && !user.registration_payment_status
  end
end
