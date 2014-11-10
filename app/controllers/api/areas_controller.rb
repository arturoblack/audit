class Api::AreasController < ApiController

  def search_areas
    @areas = Area.where('nombre ilike ?', "%#{params[:query]}%")
  end
 
  def create
    area = Area.new(area_params)
    if area.save
      render json: {
                    message: t("areas.flashes.created"),
                    area: { id: area.id }
                   },
             status: :created
    else
      render json: {
                    message: t("areas.flashes.error"),
                    errors: area.errors.messages
                   },
             status: :unprocessable_entity
    end
  end
  
  def show
    area = Area.find(params[:id])
    render json: {area: { id: area.id, nombre: area.nombre}}
  end
 
  private
  def area_params
    oestrategicos = Oestrategico.where(id: params[:area][:oestrategicos])
    {nombre: params[:area][:nombre], oestrategicos: oestrategicos}
  end

end
