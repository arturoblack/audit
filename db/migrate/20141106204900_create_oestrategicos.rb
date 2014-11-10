class CreateOestrategicos < ActiveRecord::Migration
  def change
    create_table :oestrategicos do |t|
      t.string :codigo
      t.string :nombre
      t.text :descripcion

      t.timestamps
    end
  end
end
