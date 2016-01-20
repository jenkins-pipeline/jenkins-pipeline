require 'sinatra'
require 'httparty'
require 'tilt/erb'
require 'yaml'
require 'json'
require './app/jenkins_client'

get '/' do
  @pipelines = pipelines
  erb :index
end

get '/api' do
  content_type :json
  pipelines.to_json
end

def pipelines
  client = JenkinsClient.new

  Dir["config/*.yml"].map do |file|
    pipeline = YAML.load_file(file)
    jobs_in_folder = client.all_jobs_from(pipeline)
    create_pipeline(jobs_in_folder, pipeline)
  end
end

def create_pipeline(jobs_in_folder, pipeline)
  jobs = []

  has_incomplete = false
  pipeline["jobs"].each do |job|
    ran = true
    job_in_folder = jobs_in_folder["jobs"].select {|job_in_folder| job["ci_name"] == job_in_folder["name"] }.first
    result = to_result_class job_in_folder["lastCompletedBuild"]["result"].downcase

    upstream_job = jobs.select {|j| j["ci_name"] == job["upstream"]}.first
    upstream_in_folder = job_in_folder["upstreamProjects"].select {|upstream| upstream["name"] == job["upstream"]}.first

    if (not upstream_job.nil?)
      current_upstream_build = upstream_job["number"]
      upstream_in_folder_build = upstream_in_folder["nextBuildNumber"] - 1

      if (current_upstream_build != upstream_in_folder_build || has_incomplete == true)
        result = "danger"
        ran = false
        has_incomplete = true
      end
    end

    if (job_in_folder["lastBuild"]["building"] == true)
      result = "warning progress-bar-striped active"
    end

    jobs.push({
      :name => job["name"],
      :ci_name => job["ci_name"],
      :ran => ran,
      :number => job_in_folder["lastCompletedBuild"]["number"],
      :last_build => result
    })
  end

  {
    name: pipeline["name"],
    jobs: jobs
  }
end

def to_result_class result
  results = { success: "success", failure: "danger" }
  results[result.to_sym]
end
