require 'rails_helper'

describe Api::OestrategicosController, type: :controller do
  render_views

  describe "GET index" do
    it "returns a list of objetivos estrategicos" do
      create_list(:oestrategico, 2)

      get :index, :format => :json

      expect(json.count).to eq(2)
    end
  end

  describe "POST create" do
    context "registration of objetivo estrategico success" do
      before do
        post :create, format: :json,
          oestrategico: attributes_for(:oestrategico) 
      end
      
      it { should respond_with(:created) }

      it 'has a response with message node' do
        expect(response.body).to have_json_node(:message).
          with(I18n.t('oestrategicos.flashes.created'))
      end

      it 'has a response with oestrategico node' do
        expect(response.body).to have_json_node(:oestrategico)
      end
    end

    context "regitration of objetivo estrategico fails" do
      before do
        post :create, format: :json, oestrategico: { nombre: '' }
      end

      it { should respond_with(:unprocessable_entity) }

      it 'has a response with message node' do
        expect(response.body).to have_json_node(:message).
          with(I18n.t('oestrategicos.flashes.error'))
      end

      it 'has a response with errors messages' do
        expect(response.body).to have_json_node(:errors)
      end
    end
  end
end
