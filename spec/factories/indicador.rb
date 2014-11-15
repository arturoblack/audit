FactoryGirl.define do
  factory :indicador do
    association :area
    sequence(:codigo) { |n| "IO-#{n}" }
    sequence(:nombre) { |n| "IO-Name-#{n}" }
    control "coneau"
    descripcion "Indicador"

    factory(:indicador_operativo) do
      type 'IndicadorOperativo'
    end 

    factory(:indicador_gestion) do
      type "IndicadorGestion"
    end
  end
end
