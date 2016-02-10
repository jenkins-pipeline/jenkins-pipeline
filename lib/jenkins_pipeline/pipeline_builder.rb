module JenkinsPipeline
  class PipelineBuilder
    def build(config, jenkins_jobs)
      pipeline_instance = Pipeline.new config["name"]

      config["jobs"].each_with_index do |job_config, index|
        matching_job = find_job(job_config["ci_name"], jenkins_jobs["jobs"])
        upstream_status = upstream_status(pipeline_instance.jobs, job_config)
        job_instance = Job.new(matching_job, job_config["name"], upstream_status)
        pipeline_instance.add_job job_instance, first?(index)
      end

      pipeline_instance
    end

    private

    def find_job(name, jobs)
      jobs.find {|job| job["name"] == name }
    end

    def upstream_status(jobs, job_config)
      upstream_job = jobs.find {|j| j.ci_name == job_config["upstream"] }
      return "" if upstream_job.nil?
      upstream_job.status
    end

    def first?(index)
      index == 0
    end
  end
end
