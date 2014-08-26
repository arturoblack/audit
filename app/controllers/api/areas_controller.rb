class Api::AreasController < ApiController
  before_action :check_query_string, only: [:search_areas]
  def search_areas
    @areas = Area.where('nombre ilike ?', "%#{params[:query]}%")
  end
  private
  def check_query_string
    unless params[:query] and params[:query].length >=3 and params[:query].length <= 250
      render json: {status: 'error',
                    message: "La consulta debe tener 3 caracteres como minimo y maximo 250.",
                    data:{}}, status: 400
    end
  end
end
