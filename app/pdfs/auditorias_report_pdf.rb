class AuditoriasReportPdf < BasePdf

  REPORT_NAME = 'Evaluación de evidencias'
  
  def initialize(ficha, tipo = 'inicial')
    super()
    @ficha = ficha
    @tipo = tipo
    @area = ficha.area
    @auditoria = ficha.auditoria
    @evaluaciones = (tipo == 'inicial' ? ficha.inicial : ficha.cumplimiento)  
    header
    sub_header_left
    sub_header_right
  end
  
  private
  
  def sub_header_left
    super(REPORT_NAME)
    move_down @lineheight_y
    text_box "AREA : #{@area.nombre}", :at => [@address_x, cursor]
    move_down @lineheight_y
    text_box "AUDITORIA : #{@auditoria.codigo}", :at => [@address_x, cursor]
    move_down @lineheight_y
    text_box "FICHA : #{@tipo.capitalize}", :at => [@address_x, cursor]
    move_down @lineheight_y
  end
  
  def sub_header_right
    evaluadas = (@tipo == 'inicial' ? @auditoria.iniciales_evaluadas : @auditoria.cumplimiento_evaluadas)
    report_header_data = [
      ["Evidencias evaluadas", evaluadas],
      ["Evidencias por evaluadar", @auditoria.total_evaluaciones - evaluadas],
      ["TOTAL", @auditoria.total_evaluaciones]
    ]
    super(report_header_data)
  end

end
