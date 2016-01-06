require 'sinatra'
require 'httparty'
require 'tilt/erb'
require 'yaml'

USERNAME = ENV["MONITOR_USERNAME"]
TOKEN = ENV["MONITOR_TOKEN"]
JENKINS_BASE_URL = ENV['MONITOR_JENKINS_BASE_URL']

get '/' do
  @pipelines = []

  Dir["config/*.yml"].each do |file|
    pipeline = YAML.load_file(file)
    @pipelines.push(get_jobs_from(pipeline))
 end

  erb :index
end

def get_jobs_from pipeline
  auth = {username: USERNAME, password: TOKEN}
  jobs = []

  pipeline[:jobs].each do |job|
    jenkins_base_url = "https://#{JENKINS_BASE_URL}/job/#{job[:location]}"

    if job[:folder] == true
      jenkins_base_url = jenkins_base_url + "-Folder/job/#{job[:location]}"
    end

    last_build_url = "#{jenkins_base_url}-#{job[:ci_name]}/lastBuild/api/json?token=#{TOKEN}"
    last_build = JSON.parse(HTTParty.get(last_build_url, basic_auth: auth).body)

    jobs.push({
    	:name => job[:name],
      :last_build => last_build["result"].downcase
    })
  end

  {
    name: pipeline[:name],
    jobs: jobs
  }
end
