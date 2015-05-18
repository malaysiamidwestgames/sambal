class CheckinEventSerializer < BaseSerializer
  attributes :id, :name, :start_time, :end_time
  has_many :checkins, serializer: CheckinWithoutEventsSerializer
end