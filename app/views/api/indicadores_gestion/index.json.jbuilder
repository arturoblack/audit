json.area do
  json.id @area.id
  json.nombre @area.nombre
end
json.indicadores_gestion do
  json.partial! 'api/indicadores_gestion/indicador_gestion', collection: @igs, as: :ig
end
