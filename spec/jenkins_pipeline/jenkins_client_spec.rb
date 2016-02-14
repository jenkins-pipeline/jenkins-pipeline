require 'spec_helper'

describe JenkinsPipeline::JenkinsClient do

  let(:folder) { false }
  let(:pipeline) { {"root_url" => "http://jenkins-ci.com", "folder" => folder} }
  let(:username) { "user" }
  let(:token) { "token" }

  before(:each) do
    allow(subject).to receive(:username).and_return(username)
    allow(subject).to receive(:token).and_return(token)
  end

  describe "#all_jobs_from" do
    context "a pipeline with a folder" do

      it "request the right path" do
        stub = stub_request(:get,  "user:token@jenkins-ci.com/api/json?tree=jobs%5Bname,lastBuild%5Bbuilding%5D,lastCompletedBuild%5Bnumber,duration,timestamp,result,changeSet%5Brevisions%5Brevision%5D%7B0,1%7D%5D%5D%5D")
          .to_return(:status => 200, :body => "{}")

        subject.all_jobs_from pipeline
        expect(stub).to have_been_requested
      end
    end

    context "a pipwline without a folder" do
      let(:folder) { "folder" }

      it "request the right path" do
        stub = stub_request(:get,  "user:token@jenkins-ci.com/job/#{folder}/api/json?tree=jobs%5Bname,lastBuild%5Bbuilding%5D,lastCompletedBuild%5Bnumber,duration,timestamp,result,changeSet%5Brevisions%5Brevision%5D%7B0,1%7D%5D%5D%5D")
          .to_return(:status => 200, :body => "{}")
          
        subject.all_jobs_from pipeline
        expect(stub).to have_been_requested
      end
    end
  end
end