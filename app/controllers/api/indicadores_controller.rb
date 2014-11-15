class Api::IndicadoresController < ApiController
  before_filter :set_area

  def index 
    @indicadores = @area.indicadores.order(:created_at)
  end

  private
  def set_area
    @area ||= Area.find(params[:area_id])
  end
end
