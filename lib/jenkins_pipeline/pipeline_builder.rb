module JenkinsPipeline
  class PipelineBuilder
    def build(jobs_in_folder, pipeline)
      jobs = []
      pipeline_instance = Pipeline.new pipeline["name"]

      pipeline["jobs"].each_with_index do |job, index|
        job_in_folder = jobs_in_folder["jobs"].select {|job_in_folder| job["ci_name"] == job_in_folder["name"] }.first
        job_instance = Job.new(job_in_folder, job["name"])
        pipeline_instance.add_job job_instance, is_first?(index)
        jobs << job_instance
      end

      pipeline_instance
    end

    def is_first? index
      index == 0
    end
  end
end
