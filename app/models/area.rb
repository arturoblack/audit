class Area < ActiveRecord::Base
  has_many :procesos
  has_many :auditorias
  has_many :evidences, through: :procesos
  validates_presence_of :nombre
  validates :nombre, length: { maximum: 250 }
  validates_uniqueness_of :nombre
end
