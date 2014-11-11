class Area < ActiveRecord::Base
  has_many :procesos
  has_many :auditorias
  has_many :indicadores
  has_many :evidences, through: :procesos
  has_and_belongs_to_many :oestrategicos

  validates_uniqueness_of :nombre, case_sensitive: false
  validates_presence_of :nombre
  validates_length_of :nombre, maximum: 250
end
