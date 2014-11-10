require 'rails_helper'

describe Oestrategico do
  it { is_expected.to validate_presence_of(:codigo) }
  it { is_expected.to validate_presence_of(:nombre) }
  it { is_expected.to validate_uniqueness_of(:codigo) }
  
  it { is_expected.to have_and_belong_to_many(:areas) }
end
