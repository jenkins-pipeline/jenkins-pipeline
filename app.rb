require 'sinatra'
require 'httparty'
require 'tilt/erb'
require 'yaml'
require './app/jenkins_client'

get '/' do
  client = JenkinsClient.new
  @pipelines = Dir["config/*.yml"].map do |file|
    pipeline = YAML.load_file(file)
    jobs_in_folder = client.all_jobs(pipeline)
    create_pipeline(jobs_in_folder, pipeline)
 end

  erb :index
end

def create_pipeline(jobs_in_folder, pipeline)
  jobs = []

  has_incomplete = false
  pipeline[:jobs].each do |job|
    ran = 100
    job_in_folder = jobs_in_folder["jobs"].select {|job_in_folder| job[:ci_name] == job_in_folder["name"] }.first
    result = job_in_folder["lastCompletedBuild"]["result"].downcase

    upstream_job = jobs.select {|j| j[:ci_name] == job[:upstream]}.first
    upstream_in_folder = job_in_folder["upstreamProjects"].select {|upstream| upstream["name"] == job[:upstream]}.first

    if (not upstream_job.nil?)
      current_upstream_build = upstream_job[:number]
      upstream_in_folder_build = upstream_in_folder["nextBuildNumber"] - 1

      if (current_upstream_build != upstream_in_folder_build || has_incomplete == true)
        result = "not"
        ran = 0
        has_incomplete = true
      end
    end

    if (job_in_folder["lastBuild"]["building"] == true)
      result = "warning progress-bar-striped active"
    end

    jobs.push({
    	:name => job[:name],
      :ci_name => job[:ci_name],
      :ran => ran,
      :number => job_in_folder["lastCompletedBuild"]["number"],
      :last_build => result
    })
  end

  {
    name: pipeline[:name],
    jobs: jobs
  }
end
