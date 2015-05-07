class Resume < ActiveRecord::Base
	dragonfly_accessor :image #do
    #storage_options :opts_for_storage
   
  #end

  #def opts_for_storage
  #  { path: "/resume/#{rand(2000)}" }
  #end
end
