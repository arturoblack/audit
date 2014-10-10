class AuditoriasReportPdf < BasePdf
  def initialize(tipo = "")
    super()
    @tipo = 'hola'
    header "AUDIT PERÚ-UC"
  end
  private
  
end
