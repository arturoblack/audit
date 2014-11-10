class CreateAreasAndOestrategicosTable < ActiveRecord::Migration
  def change
    create_table :areas_oestrategicos, id: false do |t|
      t.belongs_to :area
      t.belongs_to :oestrategico
    end
    add_index :areas_oestrategicos, [:area_id, :oestrategico_id]
  end
end
