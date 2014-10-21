# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
['Recursos Humanos', 'Proyección Social', 'Colocación Laboral',
 'Instituto de Investigación', 'Consejería Académica',
'Grados y Títulos','Instituto de Investigación','Recursos Educacionales',
'Vinculación Internacional','Bienestar universitario'].each {|area| Area.create(nombre: area)}
proyeccion_social = Area.find_by_nombre('Proyección Social')
{'Planificación y Organización' =>
 ['Plan de trabajo de la unidad a cargo de Proyección social (docentes requeridos)',
'Plan Operativo',
'Reglamento de Proyección social y Resolución',
'Manual de procesos de Proyección social y Resolución',
'Programa de Proyectos de proyección social y Acta de Aprobación',
'Registro de docentes que participan en las labores de Proyección social.',
'Carpeta de trabajo para iniciar el proceso',
'Calendario  de  Fechas de presentación de trabajos',
'Cronograma de actividades por semestre',
'Políticas en la ejecución de calidad de proyección social',
'Reglamento interno de trabajo'],
'Evaluación y Toma de Decisiones' => ['Propuesta  de Mejora'],
'Control (Seguimiento y Revisión)' =>
['Resultados de la Gestión de Protyección Social',
'BSC de Proyección Social',
'Encuestas de Satisfacción del Sistema de proyección social',
'Focus group a los grupos de interés en el desarrollo del Proceso (Evidencias)',
'Encuestas a los grupos de interes para saber si conocen los derechos de propiedad intelectual'],
'Recolección y Tratamiento de Datos' => 
['Reporte de quejas, sugerencias y reclamos','Instrumento de Recolección de Información'],
'Convocatoria e Inscripción' =>
['Registro de estudiantes vinculados a la proyección y su grado de participación en los proyectos.'],
'Revisión e Inscripción de Proyectos' =>
['Registro de participantes  inscritos en proyección Social'],
'Seguimiento de la Ejecución del Proyectos' =>
['Regitro de reuniones',
'Acta de Supervisión',
'Informe Parcial/Lista de Cotejo'],
'Evaluación del Proyecto' =>
['Acta de Aprobación del Proyecto',
'Certificado de Realización del Proyección Social',
'Informe final de alumnos con Proyección social finalizada',
'Instrumentos de evaluación utilizados.',
'Informe de evaluación de los Proyectos de Proyección Social'],
'Difusión (Evidencia escrita, audiovisual y electrónica)' =>
['Articulos y Notas de Difusión (escrito, audiovisual y electrónica)',
'Revistas de Proyección social (escrito, audiovisual y electrónica)',
'Registro de medios utilizados de comunicación.',
'Registro de publicaciones.',
'Registro de los grupos de interés que  conocen los resultados de Proyección social.',
'Registro de publicaciones de docentes que difunden la proyección social donde intervinieron',
'Registros donde se publican la proyeccion social de docentes (escrito,web, electronico)'],
'Elaboración, Edición y Presentación  de los proyectos (memoria) y Publicación' =>
['Proyectos editados en libros',
'Memoria de proyección social'],
'Protección de resultados (Gestión de Registros de Patente)' =>
['Reglamento de Protección Intelectual',
'Resgistro de protección intelectual']
}.each do |proceso,evidencias|
  pro = proyeccion_social.procesos.create(nombre: proceso)
  evidencias.each {|evidencia| pro.evidences.create(nombre:evidencia)} if pro.id
end

  
