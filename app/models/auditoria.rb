class Auditoria < ActiveRecord::Base
  belongs_to :area
  has_many :evaluaciones
  has_many :evaluaciones_iniciales,
   -> { where(tipo: 'inicial') }, class_name: "Evaluacion"
  has_many :evaluaciones_de_cumplimiento,
   -> { where(tipo: 'cumplimiento') }, class_name: "Evaluacion"

  validates_presence_of :codigo, :area_id, :fecha_programada
  validates :codigo, length: { maximum: 250 }
  validates_uniqueness_of :codigo, :case_sensitive => false
  validates_date :fecha_programada
  validate :validate_area_exists

  
  include AASM

  aasm do
    state :programada, :initial => true
    state :evaluacion
    state :cumplimiento#, :before_enter => :create_evaluaciones_iniciales
    state :finalizada

    event :empezar_evaluacion, :after => Proc.new { create_evaluaciones_iniciales } do
      transitions :from => :programada, :to => :evaluacion
    end

    event :verificar_cumplimiento, :after => Proc.new { create_evaluaciones_de_cumplimiento } do
      transitions :from => :evaluacion, :to => :cumplimiento, :guard => :finished_evaluacion?
    end

    event :finalizar do
      transitions :from => :cumplimiento, :to => :finalizada, :guard => :finished_cumplimiento?
    end
  end

  private
  def finished_evaluacion?
    self.total_evaluaciones == self.iniciales_evaluadas
  end
  def finished_cumplimiento?
    self.total_evaluaciones == self.cumplimiento_evaluadas
  end
  def validate_area_exists
    errors[:area_id] << 'not registered.' unless
                       Area.find_by_id(self.area_id)
  end
  def create_evaluaciones_iniciales
    area = Area.find(self.area_id)
    total = 0
    area.evidences.each do |evidence|
      self.evaluaciones_iniciales.create(evidence_id: evidence.id,
                        proceso_id: evidence.proceso_id)
      total += 1
    end
    self.update_attributes(total_evaluaciones: total) 
  end
  def create_evaluaciones_de_cumplimiento
    cumplidas = 0
    self.evaluaciones_iniciales.each do |evaluacion|
      if evaluacion.cumplimiento
        cumplidas += 1
        self.evaluaciones_de_cumplimiento.create(evidence_id: evaluacion.evidence_id,
          proceso_id:evaluacion.proceso_id, evaluada:true, fecha_evaluacion: Date.today,
          cumplimiento:true)
      else
        self.evaluaciones_de_cumplimiento.create(evidence_id: evaluacion.evidence_id,
                                                proceso_id:evaluacion.proceso_id)
      end
    end
    self.update_attributes(cumplimiento_evaluadas: cumplidas) 
  end
end
