class CreateIndicador < ActiveRecord::Migration
  def change
    create_table :indicadores do |t|
      t.integer :area_id
      t.string :codigo
      t.string :nombre
      t.string :type
      t.string :control
      t.text :descripcion
      t.timestamps
    end
    add_index :indicadores, [:type]
    add_index :indicadores, [:area_id]
  end
end
