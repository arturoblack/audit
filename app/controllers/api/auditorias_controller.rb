class Api::AuditoriasController < ApiController
  def index
    sleep 0.5
    @area = Area.find(params[:area_id])
    @audits = @area.auditorias
  end
  def create
    area = Area.find(params[:area_id])
    auditoria = area.auditorias.build(auditoria_params)
    if auditoria.save
      render json: {message: "La auditoría con código '#{auditoria.codigo}' fue creada correctamente.",
                    auditoria: {id: auditoria.id, codigo: auditoria.codigo,
                    fecha_prevista: auditoria.fecha_prevista}}, status: :created
    else
      render json: {error: 'No procesado.',
                    data: {errors: auditoria.errors.messages}}, status: 422
    end             
  end
  private
  def auditoria_params
    params.require(:auditoria).permit(:codigo,:fecha_prevista) 
  end
end
