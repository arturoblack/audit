class CreateAuditorias < ActiveRecord::Migration
  def change
    create_table :auditorias do |t|
      t.string :codigo
      t.date :fecha_programada
      t.integer :area_id
      t.string :aasm_state
      t.integer :total_evaluaciones, default: 0
      t.integer :iniciales_evaluadas, default: 0
      t.integer :cumplimiento_evaluadas, default: 0
      t.timestamps
    end
  end
end
