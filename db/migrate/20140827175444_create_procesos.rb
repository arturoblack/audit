class CreateProcesos < ActiveRecord::Migration
  def change
    create_table :procesos do |t|
      t.string :nombre
      t.integer :area_id

      t.timestamps
    end
    add_index :procesos, :area_id
  end
end
