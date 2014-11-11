require 'rails_helper'

describe Api::AreasController, type: :controller do
  render_views

  describe "#index" do
    it "responds with the correct status code" do
      get :index, format: :json
      
      expect(response.status).to eq(200)
    end

    it "returns all created areas" do
      create_list(:area, 2)

      get :index, format: :json

      expect(json.count).to eq(2)
    end
  end

  describe "#create" do
    context "registration of area success" do
      
      it "responds with the correct status code" do
        post :create, format: :json, area: {nombre: 'Area1'}

        expect(response.status).to eq(201)
      end

      it "register the supplied area" do
        expect{
          post :create, format: :json, area: {nombre: 'Area1'}
        }.to change{Area.count}.by(1)
      end

      it "has a response with message node" do
        post :create, format: :json, area: {nombre: 'Area1'}

        expect(response.body).to have_json_node(:message).
          with(I18n.t('areas.flashes.created'))
      end

      it 'has a response with area node' do
        post :create, format: :json, area: {nombre: 'Area1'}
        
        expect(response.body).to have_json_node(:area)
        expect(response.body).to have_json_node(:id)
      end
 
      context "when supplied objectivos estrategicos" do
        it 'creates the area relation with objetivos estrategicos' do
          oe1 = create(:oestrategico)
          oe2 = create(:oestrategico)
          oes_ids = [oe1.id, oe2.id]

          post :create, format: :json, area: {nombre: 'Area1', 
                                              oestrategicos: oes_ids}
          created_area = Area.last

          expect(created_area.oestrategicos).to match_array([oe1, oe2])
        end
      end
    end

    context "registration of area fails" do
      before do
        post :create, format: :json, area: { nombre: '' }
      end

      it { should respond_with(:unprocessable_entity) }

      it 'has a response with message node' do
        expect(response.body).to have_json_node(:message).
          with(I18n.t('areas.flashes.error'))
      end

      it 'has a response with errors messages' do
        expect(response.body).to have_json_node(:errors)
      end
    end
  end
end
