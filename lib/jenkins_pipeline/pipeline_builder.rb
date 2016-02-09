module JenkinsPipeline
  class PipelineBuilder
    def build(pipeline, jenkins_jobs)
      jobs = []
      pipeline_instance = Pipeline.new pipeline["name"]

      pipeline["jobs"].each_with_index do |job, index|
        matching_job = find_job(job["ci_name"], jenkins_jobs["jobs"])
        job_instance = Job.new(matching_job, job["name"])
        pipeline_instance.add_job job_instance, is_first?(index)
        jobs << job_instance
      end

      pipeline_instance
    end

    def is_first?(index)
      index == 0
    end

    private

    def find_job(name, jobs)
      jobs.find { |job| job["name"] == name }
    end
  end
end
