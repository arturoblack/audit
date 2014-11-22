class AddClaseToIndicador < ActiveRecord::Migration
  def change
    add_column :indicadores, :clase, :string
  end
end
