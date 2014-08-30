json.proceso do
  json.id @proceso.id
  json.nombre @proceso.nombre
  json.total_evidencias @proceso.evidences_count
end
json.evidences do
  json.array!(@evidences) do |evidence|
    json.id evidence.id
    json.nombre evidence.nombre
  end
end