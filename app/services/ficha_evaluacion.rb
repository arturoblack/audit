class FichaEvaluacion
  attr_reader :auditoria
  def initialize(auditoria)
    @auditoria = auditoria
  end
  def inicial
    auditoria.evaluaciones_iniciales.includes(:proceso,:evidence)
  end
  def cumplimiento
    auditoria.evaluaciones_de_cumplimiento.includes(:proceso,:evidence)
  end
  def area
    auditoria.area
  end
end
