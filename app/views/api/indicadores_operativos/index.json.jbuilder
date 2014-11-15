json.area do
  json.id @area.id
  json.nombre @area.nombre
end
json.indicadores_operativos do
  json.partial! 'api/indicadores_operativos/indicador_operativo', collection: @ios, as: :io
end
