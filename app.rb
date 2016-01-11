require 'sinatra'
require 'httparty'
require 'tilt/erb'
require 'yaml'

USERNAME = ENV["MONITOR_USERNAME"]
TOKEN = ENV["MONITOR_TOKEN"]
JENKINS_BASE_URL = ENV['MONITOR_JENKINS_BASE_URL']

get '/' do
  @pipelines = Dir["config/*.yml"].map do |file|
    pipeline = YAML.load_file(file)
    get_jobs_from(pipeline)
 end

  erb :index
end

def get_jobs_from pipeline
  auth = {username: USERNAME, password: TOKEN}
  jobs = []

  jenkins_base_url = URI.escape("https://#{JENKINS_BASE_URL}/job/#{pipeline[:folder]}-Folder/api/json?tree=jobs[name,builds[number,result]{0,1}]")
  jobs_in_folder = JSON.parse(HTTParty.get(jenkins_base_url, basic_auth: auth).body)

  puts jobs_in_folder.inspect

  pipeline[:jobs].each do |job|
    job_name = "#{pipeline[:folder]}-#{job[:ci_name]}"
    result = jobs_in_folder["jobs"].select {|job_in_folder| job_name == job_in_folder["name"] }.first
    jobs.push({
      	:name => job[:name],
        :last_build => result["builds"].first["result"].downcase
      })
  end

  {
    name: pipeline[:name],
    jobs: jobs
  }
end
