json.array!(@areas) do |area|
  json.id area.id
  json.nombre area.nombre
  json.oestrategicos area.oestrategicos.count
  json.procesos area.procesos.count
  json.auditorias area.auditorias.count
end
