class CheckinSerializer < BaseSerializer
	attributes :id
  has_one :user
  has_one :checkin_event

  def include_checkin_event?
    !@options.has_key?(:serialize_event) || @options[:serialize_event]
  end
end