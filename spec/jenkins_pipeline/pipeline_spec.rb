require 'spec_helper'

describe JenkinsPipeline::Pipeline do
  let(:revision) { 1 }
  let(:name) { "name" }
  let(:job) { instance_double(JenkinsPipeline::Job, revision: revision) }

  subject { described_class.new name }
  describe "#revision" do
    context "is first job" do
      before { subject.add_job job, true }
      it { expect(subject.revision).to eq revision }
    end
    context "is not the first job" do
      before { subject.add_job job }
      it { expect(subject.revision).to eq 0 }
    end
  end

  describe "#name" do
    it { expect(subject.name).to eq name }
  end

end
