class Api::EvidencesController < ApiController
  def index
    sleep 0.5
    @proceso = Proceso.find(params[:proceso_id])
    @evidences = @proceso.evidences
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
  def evidences_params
    params.require(:evidence).permit(:nombre) 
  end
end