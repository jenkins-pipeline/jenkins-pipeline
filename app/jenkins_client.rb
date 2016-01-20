require 'httparty'
require 'dotenv'

Dotenv.load

USERNAME = ENV["MONITOR_USERNAME"]
TOKEN = ENV["MONITOR_TOKEN"]
JENKINS_BASE_URL = ENV['MONITOR_JENKINS_BASE_URL']

class JenkinsClient
  def all_jobs_from pipeline
    auth = {username: USERNAME, password: TOKEN}
    jenkins_base_url = ""

    if (not pipeline[:folder].nil?)
      jenkins_base_url = URI.escape("https://#{JENKINS_BASE_URL}/job/#{pipeline[:folder]}/api/json?tree=jobs[name,upstreamProjects[name,nextBuildNumber],lastBuild[building],lastCompletedBuild[number,duration,timestamp,result]]")
    else
      jenkins_base_url = URI.escape("https://#{JENKINS_BASE_URL}/api/json?tree=jobs[name,upstreamProjects[name,nextBuildNumber],lastBuild[building],lastCompletedBuild[number,duration,timestamp,result]]")
    end

    JSON.parse(HTTParty.get(jenkins_base_url, basic_auth: auth).body)
  end
end
