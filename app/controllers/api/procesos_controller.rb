class Api::ProcesosController < ApiController
  def index
    sleep 0.5
    @area = Area.find(params[:area_id])
    @procesos = @area.procesos.includes(:evidences)
  end
end
