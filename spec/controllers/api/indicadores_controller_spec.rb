require 'rails_helper'

describe Api::IndicadoresController do
  render_views

  describe "#index" do
    before do
      @area = create(:area)
    end

    it "returns a list of all indicadores" do
      create_list(:indicador_gestion, 1, area_id: @area.id)
      create_list(:indicador_operativo, 1, area_id: @area.id)

      post :index, format: :json, area_id: @area.id

      expect(json["indicadores"].count).to eq(2)
    end

    it "return the indicator area" do
      post :index, format: :json, area_id: @area.id

      expect(json["area"]["id"]).to eq(@area.id)
    end
  end
end
