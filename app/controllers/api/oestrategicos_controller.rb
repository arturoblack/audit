class Api::OestrategicosController < ApiController
  def index
    @oestrategicos = Oestrategico.all.order(:created_at)
  end
  
  def create
    oestrategico = Oestrategico.new(oestrategico_params)
    if oestrategico.save
      render json: {
                    message: t("oestrategicos.flashes.created"),
                    oestrategico: oestrategico.to_json
                   },
             status: :created
    else
      render json: {
                    message: t("oestrategicos.flashes.error"),
                    errors: oestrategico.errors.messages
                   },
             status: :unprocessable_entity
    end
  end

  private

  def oestrategico_params
    params.require(:oestrategico).permit(:codigo, :nombre, :descripcion)
  end
end

