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
    @auditoria = Auditoria.find(params[:auditoria_id]) 
    @evaluaciones_iniciales = @auditoria.evaluaciones_iniciales.includes(:proceso,:evidence)
  end

  private
  def auditoria_params
    params.require(:auditoria).permit(:codigo,:fecha_programada) 
  end
end
