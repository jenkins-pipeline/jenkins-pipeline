
module JenkinsPipeline
  class App < Sinatra::Base

    set :views, './views'
    set :public_folder, './public'

    get '/' do
      @pipelines = pipelines
      erb :index
    end

    get '/api' do
      content_type :json
      pipelines.to_json
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
      revision = 0

      has_incomplete = false
      pipeline["jobs"].each_with_index do |job, index|
        ran = true
        job_in_folder = jobs_in_folder["jobs"].select {|job_in_folder| job["ci_name"] == job_in_folder["name"] }.first
        job_instance = Job.new(job_in_folder)

        if (index == 0)
          revisions = job_in_folder["lastCompletedBuild"]["changeSet"]["revisions"] || []
          if (revisions.any?)
            revision = revisions[0]["revision"]
          end
        end

        upstream_job = jobs.select {|j| j["ci_name"] == job["upstream"]}.first
        upstream_in_folder = job_in_folder["upstreamProjects"].select {|upstream| upstream["name"] == job["upstream"]}.first

        if (not upstream_job.nil?)
          current_upstream_build = upstream_job["number"]
          if (not upstream_in_folder.nil?)
            upstream_in_folder_build = upstream_in_folder["nextBuildNumber"] - 1

            if (current_upstream_build != upstream_in_folder_build || has_incomplete == true)
              job_instance.result = "danger"
              ran = false
              has_incomplete = true
            end
          end
        end

        jobs.push({
          name: job_instance.name,
          ci_name: job_instance.ci_name,
          timestamp: job_instance.timestamp,
          duration: job_instance.duration,
          ran: ran,
          number: job_instance.number,
          last_build: job_instance.result_class
        })
      end

      {
        name: pipeline["name"],
        revision: revision,
        jobs: jobs
      }
    end

  end
end
