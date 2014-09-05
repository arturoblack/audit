json.area do
  json.id @area.id
  json.nombre @area.nombre
end
json.auditorias do
  json.array!(@audits) do |audit|
    json.id audit.id
    json.codigo audit.codigo
    json.state audit.aasm_state
    json.fecha_programada audit.fecha_programada
    json.total_evaluaciones audit.total_evaluaciones
    json.iniciales_evaluadas audit.iniciales_evaluadas
    json.cumplimiento_evaluadas audit.cumplimiento_evaluadas
  end
end