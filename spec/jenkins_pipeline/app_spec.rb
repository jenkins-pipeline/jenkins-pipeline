require 'spec_helper'

describe JenkinsPipeline::App do

  it "Returns urls from all pipeline config files" do
    get '/api/pipelines/ids'
    # expect(subject).to have_received(:configuration)
    expect(last_response.header["Content-Type"]).to eq "application/json"
    expect(last_response).to be_ok
  end

end