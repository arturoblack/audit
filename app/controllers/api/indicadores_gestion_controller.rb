class Api::IndicadoresGestionController < ApiController 
  before_filter :set_area
  def index
    @igs = @area.indicadores_gestion.order(:created_at)
  end
  def create
    ig = @area.indicadores.build(indicador_gestion_params)
    if ig.save
      render json: {
                    message: t("indicadores_gestion.flashes.created"),
                    indicador_gestion: { id: ig.id }
                   },
             status: :created
    else
      render json: {
                    message: t("indicadores.flashes.error"),
                    errors: ig.errors.messages
                   },
             status: :unprocessable_entity
    end

  end

  private
  def set_area
    @area ||= Area.find(params[:area_id])
  end
  def indicador_gestion_params
    params.require(:indicador_gestion).
      permit(:codigo, :nombre, :control, :descripcion, :clase).
      merge({type: 'IndicadorGestion'})
  end
end
