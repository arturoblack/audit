FactoryGirl.define do
  factory :oestrategico do
    sequence(:codigo) { |n| "OE-#{n}" }
    nombre "Be the best"
    descripcion "Somer"
  end
end
