require 'spec_helper'

describe JenkinsPipeline::Configuration do

  before do
    allow(subject).to receive(:files).and_return([{"id" => "url-id"}])
  end

  describe "#pipelines" do
    it { expect(subject.pipelines.size).to eq 1 }
  end

  describe "#pipelines_ids" do
    it { expect(subject.pipelines_ids).to include "url-id" }
  end

end