class CreateEvaluaciones < ActiveRecord::Migration
  def change
    create_table :evaluaciones do |t|
      t.integer :auditoria_id
      t.integer :evidence_id
      t.integer :proceso_id
      t.date :fecha_evaluacion
      t.boolean :cumplimiento
      t.string :observacion
      t.text :plan_accion
      t.date :fecha_cumplimiento
      t.string :tipo
      t.boolean :evaluada

      t.timestamps
    end
    add_index :evaluaciones, [:tipo,:auditoria_id]
  end
end
