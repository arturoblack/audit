class AuditoriasReportPdf < BasePdf
  REPORT_NAME = 'Evaluación de evidencias'
  def initialize(tipo = "")
    super()
    header
    sub_header_left
    sub_header_right
  end
  private
  def sub_header_left
    super(REPORT_NAME)
    text_box "AREA : #{REPORT_NAME}", :at => [@address_x, cursor]
    move_down @lineheight_y
    text_box "FICHA : #{current_datetime}", :at => [@address_x, cursor]
    move_down @lineheight_y
  end
  def sub_header_right
    report_header_data = [
      ["Evidencias evaluadas",2],
      ["Evidencias por evaluadar", 3],
      ["TOTAL", 2]
    ]
    super(report_header_data)
  end
end
