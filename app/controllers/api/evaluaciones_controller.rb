class Api::EvaluacionesController < ApiController
  def update
    @auditoria = Auditoria.find(params[:auditoria_id])
    @evaluacion = @auditoria.evaluaciones.find(params[:id])
    if @evaluacion.update_attributes(evaluacion_params)
      #ojo falta validar si se puede edtar dependiendo en que fase de la auditoria se esta
      render
    else
      render json: {error: 'No procesado.',
                    data: {errors: @evaluacion.errors.messages}}, status: 422
    end
  end 
  private
  def evaluacion_params
    params.require(:evaluacion).permit(:cumplimiento, :observacion,
      :plan_accion,:fecha_cumplimiento) 
  end
end
