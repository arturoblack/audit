json.auditoria do
  json.id @auditoria.id
  json.codigo @auditoria.codigo
  json.state @auditoria.aasm_state
  json.total_evaluaciones @auditoria.total_evaluaciones
  json.iniciales_evaluadas @auditoria.iniciales_evaluadas
  json.cumplimiento_evaluadas @auditoria.cumplimiento_evaluadas
  json.iniciales_cumplidas @auditoria.evaluaciones_iniciales.where(cumplimiento:true).count
end