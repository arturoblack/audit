class Proceso < ActiveRecord::Base
  belongs_to :area
  has_many :evidences
  validates_presence_of :nombre, :area_id
  validates :nombre, length: { maximum: 250 }
  validates_uniqueness_of :nombre, :scope => :area_id

  validate :validate_area_exists

  private
  def validate_area_exists
    errors[:area_id] << 'not registered.' unless
                       Area.find_by_id(self.area_id)
  end
end
