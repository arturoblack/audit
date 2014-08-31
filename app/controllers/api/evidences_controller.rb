class Api::EvidencesController < ApiController
  def index
    sleep 0.5
    @proceso = Proceso.find(params[:proceso_id])
    @evidences = @proceso.evidences
  end
  def create
    proceso = Proceso.find(params[:proceso_id])
    evidence = proceso.evidences.build(evidence_params)
    if evidence.save
      render json: {message: "La evidencia '#{evidence.nombre}' fue creada correctamente.",
                    evidence: {id: evidence.id, nombre: evidence.nombre}}, status: :created
    else
      render json: {error: 'No procesado.',
                    data: {errors: evidence.errors.messages}}, status: 422
    end             
  end
  private
  def evidence_params
    params.require(:evidence).permit(:nombre) 
  end
end