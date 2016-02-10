require "spec_helper"

describe JenkinsPipeline::PipelineBuilder do
  let(:name) { "Web Application" }
  let(:revision) { 651 }
  let(:jenkins_jobs) {
    {
      "jobs" => [
        {
          "name" => "Builder",
          "lastBuild" => {
            "actions" => [
              {
                "causes" => [
                  {
                    "upstreamBuild" => 182,
                    "upstreamProject" => "AnyFolderIfExists/UnitTest"
                  }
                ]
              }
            ],
            "building" => false
          },
          "lastCompletedBuild" => {
            "duration" => 142488,
            "number" => 48,
            "result" => "SUCCESS",
            "timestamp" => 1454697115174,
            "changeSet" => {}
          }
        },
        {
          "name" => "UnitTest",
          "lastBuild" => {
            "building" => false
          },
          "lastCompletedBuild" => {
            "duration" => 257872,
            "number" => 182,
            "result" => "SUCCESS",
            "timestamp" => 1454696844634,
            "changeSet" => {
              "revisions" => [
                {
                  "revision" => revision
                }
              ]
            }
          }
        }
      ]
    }
  }
  let(:file) {
    {
      "name" => name,
      "root_url" => "https://myapp.ci.com/",
      "id" => "Web Application",
      "jobs" => [
        {
          "name" => "Unit Test",
          "ci_name" => "UnitTest"
        },
        {
          "name" => "Build",
          "ci_name" => "Builder",
          "upstream" => "UnitTest"
        }
      ]
    }
  }

  context "#build" do
    describe "#name" do
      it { expect(subject.build(file, jenkins_jobs).name).to eq(name) }
    end

    describe "#revision" do
      it { expect(subject.build(file, jenkins_jobs).revision).to eq(revision) }
    end

    describe "should have 2 jobs" do
      it { expect(subject.build(file, jenkins_jobs).jobs.size).to eq(2) }
    end
  end
end
