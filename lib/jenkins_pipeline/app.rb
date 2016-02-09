module JenkinsPipeline
  class App < Sinatra::Base

    set :public_folder, './public'

    get '/' do
      send_file File.join(settings.public_folder, 'index.html')
    end

    get '/api/pipelines' do
      content_type :json
      pipelines.map(&:serialize).to_json
    end

    get '/api/pipelines/ids' do
      content_type :json
      configuration.pipelines_ids.to_json
    end

    get '/api/pipelines/:id' do
      content_type :json
      found_file = pipeline_files.find { |file| file.fetch("id") == params[:id] }
      halt 404 if found_file.nil?
      pipeline(found_file).serialize.to_json
    end

    private

    def pipeline_files
      configuration.pipelines
    end

    def pipelines
      pipeline_files.map(&:pipeline)
    end

    def pipeline file
      jenkins_jobs = jenkins_client.all_jobs_from(file)
      pipeline_builder.build(file, jenkins_jobs)
    end

    def configuration
      @configuration ||= Configuration.new
    end

    def jenkins_client
      @jenkins_client ||= JenkinsClient.new
    end

    def pipeline_builder
      @pipeline_builder ||= PipelineBuilder.new
    end
  end
end
