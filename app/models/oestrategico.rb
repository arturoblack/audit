class Oestrategico < ActiveRecord::Base
  validates_presence_of :codigo, :nombre
  validates_uniqueness_of :codigo
end
