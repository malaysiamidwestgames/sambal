class CheckinWithoutEventsSerializer < BaseSerializer
	attributes :id
  has_one :user
end