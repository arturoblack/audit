class Evaluacion < ActiveRecord::Base
  belongs_to :auditoria
  belongs_to :evidence
  belongs_to :proceso

  validates_presence_of :auditoria_id, :proceso_id, :evidence_id
  validates_inclusion_of :cumplimiento, :in => [true, false], on: :update
  validates :observacion, :presence => true, :if => :no_cumplido?, on: :update
  validates :observacion, length: { maximum: 250 }
  validates :plan_accion, length: { maximum: 250 }
  validates_date :fecha_cumplimiento, allow_blank: true
  before_save :data_for_first_update

  private
  def no_cumplido?
    !self.cumplimiento
  end

  def data_for_first_update
    unless self.evaluada?
      if self.persisted?
        self.fecha_evaluacion = Date.today()        
        self.evaluada = true
        self.tipo == 'inicial' ? self.auditoria.increment!(:iniciales_evaluadas) :
                                 self.auditoria.increment!(:cumplimiento_evaluadas) 
      end
    end
  end
end
