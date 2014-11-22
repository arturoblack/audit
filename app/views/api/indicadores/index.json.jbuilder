json.area do
  json.id @area.id
  json.nombre @area.nombre
end
json.indicadores do
  json.array! @indicadores do |indicador|
    json.id indicador.id
    json.codigo indicador.codigo
    json.nombre indicador.codigo
    json.type indicador.type
    json.control indicador.control
    json.descripcion indicador.descripcion
    json.clase indicador.clase
  end
end
