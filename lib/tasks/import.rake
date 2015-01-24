#lib/tasks/import.rake
desc "Imports a CSV file into an ActiveRecord table"
task :csv_model_import, [:filename, :model] => [:environment] do |task,args|
  lines = File.new(args[:filename]).readlines
  header = lines.shift.strip
  keys = header.split(',')
  lines.each do |line|
    values = line.strip.split(',')
    attributes = Hash[keys.zip values]
    Module.const_get(args[:model]).create(attributes)
  end
end