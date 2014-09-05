json.auditoria do
  json.id @auditoria.id
  json.codigo @auditoria.codigo
  json.state @auditoria.aasm_state
  json.total_evaluaciones @auditoria.total_evaluaciones
  json.iniciales_evaluadas @auditoria.iniciales_evaluadas
  json.cumplimiento_evaluadas @auditoria.cumplimiento_evaluadas
end
json.evaluaciones_iniciales do
  json.array!(@evaluaciones_iniciales) do |ev|
    json.id ev.id
    json.proceso ev.proceso.nombre
    json.evidence ev.evidence.nombre
    json.cumplimiento ev.cumplimiento
    json.fecha_evaluacion ev.fecha_evaluacion
    json.observacion ev.observacion
    json.plan_accion ev.plan_accion
    json.fecha_cumplimiento ev.fecha_cumplimiento
    json.tipo ev.tipo
    json.evaluada ev.evaluada
  end
end

    