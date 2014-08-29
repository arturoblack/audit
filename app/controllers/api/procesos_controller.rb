class Api::ProcesosController < ApiController
  def index
    sleep 0.5
    @area = Area.find(params[:area_id])
    @procesos = @area.procesos.includes(:evidences)
  end
  def create
    area = Area.find(params[:area_id])
    proceso = area.procesos.build(proceso_params)
    if proceso.save
      render json: {message: "El proceso '#{proceso.nombre}' fue creado correctamente.",
                    proceso: {id: proceso.id, nombre: proceso.nombre}}, status: :created
    else
      render json: {error: 'No procesado.',
                    data: {errors: proceso.errors.messages}}, status: 422
    end             
  end
  private
  def proceso_params
    params.require(:proceso).permit(:nombre) 
  end
end
