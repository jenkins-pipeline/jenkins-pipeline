require 'spec_helper'

describe JenkinsPipeline::Job do

  let(:jenkins_response) {
    {
      "name"=> "Unit Test",
       "ci_name"=> "Trunk-UnitTest",
       "timestamp"=> 1453322525895,
       "duration"=> 121261,
       "ran"=> true,
       "number"=> 397,
       "last_build"=> "success",
       "lastCompletedBuild"=> {
          "duration"=> 3822739,
          "number"=> 4410,
          "result"=> "SUCCESS",
          "timestamp"=> 1453828785568
        }
     }
  }

  let(:subject) { described_class.new jenkins_response }

  describe "#name" do
    let(:name) { jenkins_response["name"] }
    it { expect(subject.name).to eq name }
  end

  describe "#ci_name" do
    let(:ci_name) { jenkins_response["ci_name"] }
    it { expect(subject.ci_name).to eq ci_name }
  end

  describe "#duration" do
    let(:duration) { jenkins_response["lastCompletedBuild"]["duration"] }
    it { expect(subject.duration).to eq duration }
  end

  describe "#timestamp" do
    let(:timestamp) { jenkins_response["lastCompletedBuild"]["timestamp"] }
    it { expect(subject.timestamp).to eq timestamp }
  end

  describe "#number" do
    let(:number) { jenkins_response["lastCompletedBuild"]["number"] }
    it { expect(subject.number).to eq number }
  end

  describe "#result_class" do
    context "job is running" do
      before { jenkins_response["lastBuild"] = { "building" => true } }
      it { expect(subject.result_class).to eq "warning progress-bar-striped active" }
    end

    context "job result is sucess" do
      it { expect(subject.result_class).to eq "success" }
    end

    context "job result is failure" do
      before { jenkins_response["lastCompletedBuild"]["result"] = "FAILURE" }
      it { expect(subject.result_class).to eq "danger" }
    end
  end
end