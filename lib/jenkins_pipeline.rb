require 'sinatra/base'
require 'httparty'
require 'tilt/erb'
require 'yaml'
require 'json'

require 'httparty'
require 'dotenv'

Dotenv.load

def require_dir(dir)
  Dir["#{dir}/**/*.rb"].each do |file|
    require file
  end
end

require_dir "#{__dir__}"

module JenkinsPipeline
  def self.run
    App.run!
  end
end