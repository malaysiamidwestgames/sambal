class CheckinEvent < ActiveRecord::Base
  has_many :checkins, :dependent => :delete_all
  has_many :users, through: :checkins

  validates :name, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true

  validate :end_time_after_start_time

  def end_time_after_start_time
    errors.add(:end_time, 'must be after start time') if end_time && start_time && end_time < start_time
  end
end
