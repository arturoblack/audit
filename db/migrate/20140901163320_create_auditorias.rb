class CreateAuditorias < ActiveRecord::Migration
  def change
    create_table :auditorias do |t|
      t.string :codigo
      t.date :fecha_prevista
      t.integer :area_id

      t.timestamps
    end
  end
end
