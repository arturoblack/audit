class Oestrategico < ActiveRecord::Base
  has_and_belongs_to_many :areas

  validates_presence_of :codigo, :nombre
  validates_uniqueness_of :codigo
end
