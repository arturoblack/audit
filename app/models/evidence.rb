class Evidence < ActiveRecord::Base
  belongs_to :proceso, counter_cache: true
  validates_presence_of :nombre, :proceso_id
  validates :nombre, length: { maximum: 250 }
  validates_uniqueness_of :nombre, :scope => :proceso_id, :case_sensitive => false

  validate :validate_process_exists

  private
  def validate_process_exists
    errors[:proceso_id] << 'not registered.' unless
                       Proceso.find_by_id(self.proceso_id)
  end
end
