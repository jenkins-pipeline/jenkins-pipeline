require 'spec_helper'

describe JenkinsPipeline::App do
  context "Smoke test" do
    it "Assert /api/pipelines/ids the endpoint is working" do
      get '/api/pipelines/ids'
      expect(last_response.header["Content-Type"]).to eq "application/json"
      expect(last_response).to be_ok
    end
  end
end
