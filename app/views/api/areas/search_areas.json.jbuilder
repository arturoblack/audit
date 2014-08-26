json.areas do
  json.array!(@areas) do |area|
    json.data area.nombre
    json.id area.id
  end
end
