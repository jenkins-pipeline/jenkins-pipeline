$LOAD_PATH.unshift(File.join(File.dirname(__FILE__), '..', 'lib'))
$LOAD_PATH.unshift(File.dirname(__FILE__))

require "jenkins_pipeline"
require "rack/test"
require "webmock/rspec"

def app
  JenkinsPipeline::App.new
end

RSpec.configure do |config|
  config.include Rack::Test::Methods
end