class Indicador < ActiveRecord::Base
  belongs_to :area

  validates_presence_of :codigo
  validates_presence_of :nombre
  validates_presence_of :type
  validates_presence_of :area_id
  validates_length_of :codigo, maximum: 250
  validates_length_of :nombre, maximum: 250
  validates_length_of :descripcion, maximum: 1000

  validates_uniqueness_of :codigo, case_sensitive: false, scope: :area_id
  validates_uniqueness_of :nombre, case_sensitive: false, scope: :area_id
  validates_inclusion_of :control, in: %w(coneau interno)
  validates_inclusion_of :clase, in: %w(satisfaccion eficacia otros)

  scope :indicadores_operativos, -> { where(type: 'IndicadorOperativo') }
  scope :indicadores_gestion, -> { where(type: 'IndicadorGestion') }
end

