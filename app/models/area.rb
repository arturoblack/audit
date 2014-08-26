class Area < ActiveRecord::Base
  validates_presence_of :nombre
  validates :nombre, length: { maximum: 250 }
  validates_uniqueness_of :nombre
end
