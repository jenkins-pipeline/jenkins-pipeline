require 'httparty'
require 'dotenv'

Dotenv.load

USERNAME = ENV["MONITOR_USERNAME"]
TOKEN = ENV["MONITOR_TOKEN"]
JENKINS_BASE_URL = ENV['MONITOR_JENKINS_BASE_URL']

class JenkinsClient
  def all_jobs pipeline
    auth = {username: USERNAME, password: TOKEN}

    jenkins_base_url = URI.escape("https://#{JENKINS_BASE_URL}/job/#{pipeline[:folder]}-Folder/api/json?tree=jobs[name,upstreamProjects[name,nextBuildNumber],lastBuild[building],lastCompletedBuild[number,duration,timestamp,result]]")

    JSON.parse(HTTParty.get(jenkins_base_url, basic_auth: auth).body)
  end
end
