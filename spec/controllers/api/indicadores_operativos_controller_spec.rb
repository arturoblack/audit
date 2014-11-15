require 'rails_helper'

describe Api::IndicadoresOperativosController, type: :controller do
  render_views

  describe "#index" do
    before do
      @area = create(:area)
    end

    it "returns the indicators area" do
      get :index, :format => :json, area_id: @area.id

      expect(json["area"]["id"]).to eq(@area.id)
    end

    it "returns a list of indicadores operativos" do
      create_list(:indicador_operativo, 3, area_id: @area.id)

      get :index, :format => :json, area_id: @area.id

      expect(json["indicadores_operativos"].count).to eq(3)
    end
  end

  describe "#create" do
    context "registration on IG sucess" do
      before do
        @area = create(:area)
      end

      it "responds with the correct status code" do
        post :create, format: :json, area_id: @area.id,
          indicador_operativo: { codigo: 'IG-01', nombre: 'INDI.1', 
                               control: 'coneau' }
        expect(response.status).to eq(201)
      end

      it "registers in area's indicadores operativos" do
        expect{
          post :create, format: :json, area_id: @area.id,
          indicador_operativo: { codigo: 'IG-01', nombre: 'INDI.1', 
                               control: 'coneau' }
        }.to change{@area.indicadores_operativos.count}.by(1)
      end

      it "has a response with message node" do
        post :create, format: :json, area_id: @area.id,
          indicador_operativo: { codigo: 'IG-01', nombre: 'INDI.1', 
                               control: 'coneau' }

        expect(response.body).to have_json_node(:message).
          with(I18n.t('indicadores_operativos.flashes.created'))
      end

      it 'has a response with indicador de operativo node' do
        post :create, format: :json, area_id: @area.id,
        indicador_operativo: { codigo: 'IG-01', nombre: 'INDI.1', 
                             control: 'coneau' }

        expect(response.body).to have_json_node(:indicador_operativo)
        expect(response.body).to have_json_node(:id)
      end
 

    end


    context "registration on IO fails" do
      before do
        area = create(:area)
        post :create, format: :json, area_id: area.id, 
          indicador_operativo: { codigo: '' }
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
end