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

    get '/api/pipelines/:id' do
      content_type :json
      file = pipeline_files.select { |file| file.fetch("id") == params[:id] }.first
      halt 404 if file.nil?
      pipeline(file).serialize.to_json
    end

    private

    def pipelines
      client = JenkinsClient.new
      pipeline_builder = PipelineBuilder.new

      pipeline_files.map do |pipeline|
        jobs_in_folder = client.all_jobs_from(pipeline)
        pipeline_builder.build(jobs_in_folder, pipeline)
      end
    end

    def pipeline file
      client = JenkinsClient.new
      pipeline_builder = PipelineBuilder.new

      jobs_in_folder = client.all_jobs_from(file)
      pipeline_builder.build(jobs_in_folder, file)
    end

    def pipeline_files
      Dir["config/*.yml"].map do |file|
        pipeline = YAML.load_file(file)
      end
    end
  end
end
