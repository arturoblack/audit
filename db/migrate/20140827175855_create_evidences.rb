class CreateEvidences < ActiveRecord::Migration
  def change
    create_table :evidences do |t|
      t.string :nombre
      t.integer :proceso_id

      t.timestamps
    end
    add_index :evidences, :proceso_id
  end
end
