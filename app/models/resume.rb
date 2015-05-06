class Resume < ActiveRecord::Base
	dragonfly_accessor :image do
    storage_options :opts_for_storage
  end

  def opts_for_storage
    { path: "assets/#{category}/#{rand(2000)}" }
  end
end
