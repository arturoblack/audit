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
'Vinculación Internacional'].each {|area| Area.create(nombre: area)}