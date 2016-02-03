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

    def pipelines
      client = JenkinsClient.new

      Dir["config/*.yml"].map do |file|
        pipeline = YAML.load_file(file)
        jobs_in_folder = client.all_jobs_from(pipeline)
        create_pipeline(jobs_in_folder, pipeline)
      end
    end

    def create_pipeline(jobs_in_folder, pipeline)
      jobs = []
      pipeline_instance = Pipeline.new pipeline["name"]
      has_incomplete = false

      pipeline["jobs"].each_with_index do |job, index|
        ran = true
        result = ""
        job_in_folder = jobs_in_folder["jobs"].select {|job_in_folder| job["ci_name"] == job_in_folder["name"] }.first

        upstream_job = jobs.select {|j| j.name == job["upstream"]}.first
        upstream_in_folder = job_in_folder["upstreamProjects"].select {|upstream| upstream["name"] == job["upstream"]}.first

        if (not upstream_job.nil?)
          current_upstream_build = upstream_job.number
          if (not upstream_in_folder.nil?)
            current_upstream_build = upstream_job.number
            upstream_in_folder_build = upstream_in_folder["nextBuildNumber"] - 1

            if (current_upstream_build != upstream_in_folder_build || has_incomplete == true)
              result = "danger"
              ran = false
              has_incomplete = true
            end
          end
        end

        job_instance = Job.new(job_in_folder, job["name"], result, ran)

        pipeline_instance.add_job job_instance, is_first?(index)

        jobs.push(job_instance)
      end
      pipeline_instance
    end

    private

    def is_first? index
      index == 0
    end
  end
end
