require 'rails_helper'

describe Indicador do
  it { is_expected.to belong_to(:area)}
  it { is_expected.to validate_presence_of(:codigo) }
  it { is_expected.to validate_presence_of(:nombre) }
  it { is_expected.to validate_presence_of(:type) }
  it { is_expected.to validate_presence_of(:area_id)}

  it { is_expected.to ensure_length_of(:codigo).is_at_most(250) }
  it { is_expected.to ensure_length_of(:nombre).is_at_most(250) }

  it { is_expected.to validate_uniqueness_of(:codigo).
       scoped_to(:area_id).case_insensitive }
  it { is_expected.to validate_uniqueness_of(:nombre).
       scoped_to(:area_id).case_insensitive }

  it { is_expected.to validate_inclusion_of(:control).
       in_array(%w(coneau interno)) }
end

