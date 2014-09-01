json.area do
  json.id @area.id
  json.nombre @area.nombre
end
json.procesos do
  json.array!(@audits) do |audit|
    json.id 2
    json.nombre 'Awewo'
  end
end