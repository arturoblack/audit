json.area do
  json.id @area.id
  json.nombre @area.nombre
end
json.procesos do
  json.array!(@procesos) do |proceso|
    json.id proceso.id
    json.nombre proceso.nombre
    json.total_evidencias proceso.evidences_count
  end
end