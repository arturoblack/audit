class AddEvidencesCountToProcesos < ActiveRecord::Migration
  def change
    add_column :procesos, :evidences_count, :integer, default: 0
  end
end
