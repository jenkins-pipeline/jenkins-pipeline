require 'spec_helper'

describe JenkinsPipeline::Job do

  let(:name) { "Unit Test" }
  let(:jenkins_response) {
    {
      "name" => "Functional",
      "lastBuild" => {
        "building" => false
      },
      "lastCompletedBuild" => {
        "duration" => 3822739,
        "number" => 4410,
        "result" => "SUCCESS",
        "timestamp" => 1453828785568,
        "changeSet" => {
          "revisions" => []
        }
      }
    }
  }
  let(:serialized_job) {
    {
      name: "Unit Test",
      finishedAt: 1453828785568,
      duration: 3822739,
      status: "success"
    }
  }
  let(:subject) { described_class.new(jenkins_response, name, "") }

  describe "#name" do
    it { expect(subject.name).to eq name }
  end

  describe "#ci_name" do
    it { expect(subject.ci_name).to eq "Functional" }
  end

  describe "#duration" do
    it { expect(subject.duration).to eq 3822739 }
  end

  describe "#finished_at" do
    it { expect(subject.finished_at).to eq 1453828785568 }
  end

  describe "#number" do
    it { expect(subject.number).to eq 4410 }
  end

  describe "#status" do
    context "job is running" do
      before { jenkins_response["lastBuild"] = { "building" => true } }
      it { expect(subject.status).to eq "running" }
    end

    context "job result is sucess" do
      it { expect(subject.status).to eq "success" }
    end

    context "job result is failure" do
      before { jenkins_response["lastCompletedBuild"]["result"] = "FAILURE" }
      it { expect(subject.status).to eq "failure" }
    end

    describe "upstream build number is running" do
      let(:subject) { described_class.new(jenkins_response, name, "running") }
      it { expect(subject.status).to eq "unknown" }
    end

    describe "upstream build number is unknown" do
      let(:subject) { described_class.new(jenkins_response, name, "unknown") }
      it { expect(subject.status).to eq "unknown" }
    end

    describe "upstream build number is failure" do
      let(:subject) { described_class.new(jenkins_response, name, "failure") }
      it { expect(subject.status).to eq "unknown" }
    end

    describe "upstream build number is aborted" do
      let(:subject) { described_class.new(jenkins_response, name, "aborted") }
      it { expect(subject.status).to eq "unknown" }
    end
  end

  describe "#serialize" do
    it { expect(subject.serialize).to eq serialized_job }
  end
end
