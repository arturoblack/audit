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
    body
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

  def body
 	  move_down 45
    
    evaluaciones_agrupadas = @evaluaciones.group_by {|ev| ev.proceso_id}
    evaluaciones_agrupadas.each do |agrupacion|
      render_proceso_name(agrupacion[0])
      render_table_of_evaluaciones(agrupacion[1])
    end
  end

  def render_proceso_name(id)
    proceso = Proceso.find(id).nombre
    text_box "PROCESO : #{proceso}", :at => [@address_x, cursor]
    move_down @lineheight_y  
  end
  def render_table_of_evaluaciones(evaluaciones)
    all_evaluaciones = []
    evaluaciones.each do |ev|
      evaluada = ev.evaluada ? 'SI' : 'NO'
      cumplida = ev.cumplimiento ? 'Cumplida' : 'No cumplida'
      all_evaluaciones << [ev.id, ev.evidence.nombre, evaluada, ev.fecha_evaluacion, cumplida]
    end
    data = 
      [['Identificador','Evidencia','¿Evaluada?', 'Fecha de evaluación',
        'Verificación']] +
        all_evaluaciones +
        [['','','','','']]  
    render_table(data)
  end
  def render_table(data)
    move_down 25

    table(data, :width => bounds.width) do
      style(row(1..-1).columns(0..-1), :padding => [4, 5, 4, 5], :borders => [:bottom], :border_color => 'dddddd')
      style(row(0), :background_color => 'e9e9e9', :border_color => 'dddddd', :font_style => :bold)
      style(row(0).columns(0..-1), :borders => [:top, :bottom])
      style(row(0).columns(0), :borders => [:top, :left, :bottom])
      style(row(0).columns(-1), :borders => [:top, :right, :bottom])
      style(row(-1), :border_width => 2)
      style(column(2..-1), :align => :right)
      style(columns(0), :width => 75)
      style(columns(1), :width => 175)
	  end
    
    move_down 25
  end
end
