# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :volunteer do
    user_id 1
    preference "MyString"
  end
end
