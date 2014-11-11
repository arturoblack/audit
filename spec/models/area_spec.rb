require 'rails_helper'

describe Area do
  it { is_expected.to validate_presence_of(:nombre) }
  it { is_expected.to validate_uniqueness_of(:nombre)}
  it { is_expected.to ensure_length_of(:nombre).is_at_most(250)}

  it { is_expected.to have_many(:procesos) }
  it { is_expected.to have_many(:auditorias) }
  it { is_expected.to have_many(:evidences) }
  it { is_expected.to have_and_belong_to_many(:oestrategicos) }
end
