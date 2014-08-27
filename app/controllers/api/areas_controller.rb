class Api::AreasController < ApiController
  before_action :check_query_string, only: [:search_areas]
  def search_areas
    @areas = Area.where('nombre ilike ?', "%#{params[:query]}%")
  end
  def show
    sleep 1
    area = Area.find(params[:id])
    render json: {area: { id: area.id, nombre: area.nombre}}
  end
  private
  def check_query_string
    unless params[:query] and params[:query].length >=3 and params[:query].length <= 250
      render json: {error: 'Bad query length',
                    description: "La consulta debe tener 3 caracteres como minimo y maximo 250."},
                    status: 400
    end
  end
end
