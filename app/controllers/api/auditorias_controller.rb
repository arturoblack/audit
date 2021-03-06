class Api::AuditoriasController < ApiController
  def index
    @area = Area.find(params[:area_id])
    @audits = @area.auditorias.order(created_at: :desc)
  end
  def show
    sleep 0.5
    @auditoria = Auditoria.find(params[:id])
  end
  def create
    area = Area.find(params[:area_id])
    auditoria = area.auditorias.build(auditoria_params)
    if auditoria.save
      render json: {message: "La auditoría con código '#{auditoria.codigo}' fue creada correctamente.",
                    auditoria: {id: auditoria.id, codigo: auditoria.codigo,
                    fecha_programada: auditoria.fecha_programada}}, status: :created
    else
      render json: {error: 'No procesado.',
                    data: {errors: auditoria.errors.messages}}, status: 422
    end             
  end
  
  def empezar_auditoria
    auditoria = Auditoria.find(params[:auditoria_id])
    auditoria.empezar_evaluacion!
    render json: {message: 'UD. puede empezar la evaluación inicial de las evidencias.'}
  end

  def evaluaciones_iniciales
    @ficha_evaluacion = FichaEvaluacion.new(auditoria)
    respond_to do |format|
      format.json {render}
      format.pdf do
        pdf = AuditoriasReportPdf.new(@ficha_evaluacion, 'inicial')
        send_data pdf.render, filename: 'AU-EV-IN', type: 'application/pdf', disposition:'inline'
      end   
    end
  end


  def evaluar_cumplimiento
    auditoria = Auditoria.find(params[:auditoria_id])
    if auditoria.total_evaluaciones == auditoria.iniciales_evaluadas
      auditoria.verificar_cumplimiento!
      render json: {message: 'UD. puede empezar con las evaluaciones de cumplimiento.'}
    else
      render json: {error: 'No procesado.',
                    description: 'Finaliza la evaluación inicial de las evidencias'},
                    status: 400
    end
  end

  def evaluaciones_de_cumplimiento
    @ficha_evaluacion = FichaEvaluacion.new(auditoria)
    respond_to do |format|
      format.json {render}
      format.pdf do
        pdf = AuditoriasReportPdf.new(@ficha_evaluacion, 'cumplimiento')
        send_data pdf.render, filename: 'AU-EV-CU', type: 'application/pdf', disposition:'inline'
      end   
    end
  end

  def finalizar_auditoria
    auditoria = Auditoria.find(params[:auditoria_id])
    if auditoria.total_evaluaciones == auditoria.cumplimiento_evaluadas
      auditoria.finalizar!
      render json: {message: "La auditoría con código #{auditoria.codigo} ha sido finalizada."}
    else
      render json: {error: 'No procesado.',
                    description: 'No puede finalizar esta auditoría sin antes concluir las evaluaciones.'},
                    status: 400
    end
  end
  private
  def auditoria_params
    params.require(:auditoria).permit(:codigo,:fecha_programada) 
  end
  def auditoria
    @auditoria ||= Auditoria.find(params[:auditoria_id]) 
  end
end
