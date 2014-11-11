FactoryGirl.define do
  factory :area do
    sequence(:nombre) { |n| "Area-#{n}" }
  end
end
