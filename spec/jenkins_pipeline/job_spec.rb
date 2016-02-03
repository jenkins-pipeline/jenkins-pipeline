require 'spec_helper'

describe JenkinsPipeline::Job do

  let(:name) { "Unit Test" }
  let(:jenkins_response) {
    {
      "name" => "Functional",
      "last_build" => {
       "building" => false,
       "number" => 4411
      },
      "lastCompletedBuild" => {
        "duration" => 3822739,
        "number" => 4410,
        "result" => "SUCCESS",
        "timestamp" => 1453828785568,
        "changeSet" => {
          "revisions" => []
        }
      },
      "upstreamProjects" => [
        {
          "name" => "Unit",
          "nextBuildNumber" => 170
        }
      ]
    }
  }

  let(:subject) { described_class.new jenkins_response, name }

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

  describe "#result_class" do
    context "job is running" do
      before { jenkins_response["lastBuild"] = { "building" => true } }
      it { expect(subject.result_class).to eq "running" }
    end

    context "job result is sucess" do
      it { expect(subject.result_class).to eq "success" }
    end

    context "job result is failure" do
      before { jenkins_response["lastCompletedBuild"]["result"] = "FAILURE" }
      it { expect(subject.result_class).to eq "failure" }
    end
  end
end
