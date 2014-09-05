json.message "Se evaluó correctamente la evidencia '#{@evaluacion.evidence.nombre}'"
json.evaluacion do
  json.id @evaluacion.id
  json.proceso @evaluacion.proceso.nombre
  json.evidence @evaluacion.evidence.nombre
  json.cumplimiento @evaluacion.cumplimiento
  json.fecha_evaluacion @evaluacion.fecha_evaluacion
  json.observacion @evaluacion.observacion
  json.plan_accion @evaluacion.plan_accion
  json.fecha_cumplimiento @evaluacion.fecha_cumplimiento
  json.tipo @evaluacion.tipo
  json.evaluada @evaluacion.evaluada
end