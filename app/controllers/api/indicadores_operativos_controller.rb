class Api::IndicadoresOperativosController < ApiController
  before_filter :set_area
  def index
    @ios = @area.indicadores_operativos.order(:created_at)
  end

  def create
    io = @area.indicadores.build(indicador_operativo_params)
    if io.save
      render json: {
                    message: t("indicadores_operativos.flashes.created"),
                    indicador_operativo: { id: io.id }
                   },
             status: :created

    else
      render json: {
                   message: t("indicadores.flashes.error"),
                   errors: io.errors.messages
                   },
             status: :unprocessable_entity
    end
  end

  private
  def set_area
    @area ||= Area.find(params[:area_id])
  end

  def indicador_operativo_params
    params.require(:indicador_operativo).
      permit(:codigo, :nombre, :control, :descripcion).
      merge({type: 'IndicadorOperativo'})
  end
end

