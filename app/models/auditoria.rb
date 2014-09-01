class Auditoria < ActiveRecord::Base
  belongs_to :area
  validates_presence_of :codigo, :area_id, :fecha_prevista
  validates :codigo, length: { maximum: 250 }
  validates_uniqueness_of :codigo, :case_sensitive => false
  validates_date :fecha_prevista
  validate :validate_area_exists

  private
  def validate_area_exists
    errors[:area_id] << 'not registered.' unless
                       Area.find_by_id(self.area_id)
  end
end
