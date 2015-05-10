class BaseSerializer < ActiveModel::Serializer

  def self.protect_attrs(test,  attrs: [])
    attrs.each do |p_attr|
      puts p_attr
      define_method("include_#{p_attr}?") do
        self.send(test)
      end
    end
  end

end