# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141106204900) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "areas", force: true do |t|
    t.string   "nombre"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "auditorias", force: true do |t|
    t.string   "codigo"
    t.date     "fecha_programada"
    t.integer  "area_id"
    t.string   "aasm_state"
    t.integer  "total_evaluaciones",     default: 0
    t.integer  "iniciales_evaluadas",    default: 0
    t.integer  "cumplimiento_evaluadas", default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "evaluaciones", force: true do |t|
    t.integer  "auditoria_id"
    t.integer  "evidence_id"
    t.integer  "proceso_id"
    t.date     "fecha_evaluacion"
    t.boolean  "cumplimiento"
    t.string   "observacion"
    t.text     "plan_accion"
    t.date     "fecha_cumplimiento"
    t.string   "tipo"
    t.boolean  "evaluada"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "evaluaciones", ["tipo", "auditoria_id"], name: "index_evaluaciones_on_tipo_and_auditoria_id", using: :btree

  create_table "evidences", force: true do |t|
    t.string   "nombre"
    t.integer  "proceso_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "evidences", ["proceso_id"], name: "index_evidences_on_proceso_id", using: :btree

  create_table "oestrategicos", force: true do |t|
    t.string   "codigo"
    t.string   "nombre"
    t.text     "descripcion"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "procesos", force: true do |t|
    t.string   "nombre"
    t.integer  "area_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "evidences_count", default: 0
  end

  add_index "procesos", ["area_id"], name: "index_procesos_on_area_id", using: :btree

end
