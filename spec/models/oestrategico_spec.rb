require 'rails_helper'

describe Oestrategico do
  it { should validate_presence_of(:codigo) }
  it { should validate_presence_of(:nombre) }
  it { should validate_uniqueness_of(:codigo)}
end
