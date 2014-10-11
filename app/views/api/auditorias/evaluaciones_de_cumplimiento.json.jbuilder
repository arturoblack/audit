json.auditoria do
  json.id @ficha_evaluacion.auditoria.id
  json.codigo @ficha_evaluacion.auditoria.codigo
  json.state @ficha_evaluacion.auditoria.aasm_state
  json.total_evaluaciones @ficha_evaluacion.auditoria.total_evaluaciones
  json.iniciales_evaluadas @ficha_evaluacion.auditoria.iniciales_evaluadas
  json.cumplimiento_evaluadas @ficha_evaluacion.auditoria.cumplimiento_evaluadas
end
json.evaluaciones_de_cumplimiento do
  json.array!(@ficha_evaluacion.cumplimiento) do |ev|
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

    
