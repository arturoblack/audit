require 'rails_helper'

describe Api::IndicadoresGestionController, type: :controller do
  render_views

  describe "#index" do
    before do
      @area = create(:area)
    end

    it "returns the indicators area" do
      get :index, :format => :json, area_id: @area.id

      expect(json["area"]["id"]).to eq(@area.id)
    end

    it "returns a list of indicadores gestion" do
      create_list(:indicador_gestion, 2, area_id: @area.id)

      get :index, :format => :json, area_id: @area.id

      expect(json["indicadores_gestion"].count).to eq(2)
    end
  end

  describe "#create" do
    context "registration on IG sucess" do
      before do
        @area = create(:area)
      end
      it "responds with the correct status code" do
        success_create
        expect(response.status).to eq(201)
      end

      it "registers in area's indicadores de gestion" do
        expect{ success_create }.
          to change{@area.indicadores_gestion.count}.by(1)
      end

      it "has a response with message node" do
        success_create       
        
        expect(response.body).to have_json_node(:message).
          with(I18n.t('indicadores_gestion.flashes.created'))
      end

      it 'has a response with indicador de gestion node' do
        success_create
        
        expect(response.body).to have_json_node(:indicador_gestion)
        expect(response.body).to have_json_node(:id)
      end
 
    end

    context "registration on IG fails" do
      before do
        area = create(:area)
        post :create, format: :json, area_id: area.id, 
          indicador_gestion: { codigo: '' }
      end

      it { should respond_with(:unprocessable_entity) }

      it 'has a response with message node' do
        expect(response.body).to have_json_node(:message).
          with(I18n.t('indicadores.flashes.error'))
      end

      it 'has a response with errors messages' do
        expect(response.body).to have_json_node(:errors)
      end
    end
  end
  
  def success_create
    post :create, format: :json, area_id: @area.id,
    indicador_gestion: { codigo: 'IG-01', nombre: 'INDI.1', 
                         control: 'coneau', clase: 'satisfaccion' }
  end
end
