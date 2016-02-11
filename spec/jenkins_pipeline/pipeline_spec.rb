require 'spec_helper'

describe JenkinsPipeline::Pipeline do
  let(:revision) { 1 }
  let(:id) { "Web Application" }
  let(:name) { "name" }
  let(:job) { instance_double(JenkinsPipeline::Job, revision: revision, serialize: {}) }
  let(:serialized_pipeline) {
    {
      name: name,
      id: id,
      revision: revision,
      jobs: [job].map(&:serialize)
    }
  }
  subject { described_class.new(id, name) }

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

  describe "#id" do
    it { expect(subject.id).to eq id }
  end

  describe "#name" do
    it { expect(subject.name).to eq name }
  end

  describe "#serialize" do
    before { subject.add_job job, true }
    it { expect(subject.serialize).to eq serialized_pipeline }
  end
end
