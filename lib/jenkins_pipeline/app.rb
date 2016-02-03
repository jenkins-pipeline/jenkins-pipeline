module JenkinsPipeline
  class App < Sinatra::Base

    set :views, './views'
    set :public_folder, './public'

    get '/' do
      @pipelines = pipelines
      erb :index
    end

    get '/api/pipelines' do
      content_type :json
      pipelines.map(&:serialize).to_json
    end

    get '/api/pipelines/:name' do
      content_type :json
      file = pipeline_files.select { |file| file.fetch("url") == params[:name] }.first
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
