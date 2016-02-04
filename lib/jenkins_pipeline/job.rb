module JenkinsPipeline
  class Job
    attr_reader :name, :status, :ci_name, :duration, :finished_at, :number

    def initialize job_hash, name
      @name = name
      @ci_name = job_hash["name"]
      @status = build_status(job_hash["lastBuild"], job_hash["lastCompletedBuild"]["result"].downcase)
      @duration = job_hash["lastCompletedBuild"]["duration"]
      @finished_at = job_hash["lastCompletedBuild"]["timestamp"]
      @number = job_hash["lastCompletedBuild"]["number"]
      @revisions = job_hash["lastCompletedBuild"]["changeSet"]["revisions"] || []
    end

    def revision
      @revisions.first["revision"] if @revisions.any?
    end

    def serialize
      {
        name: @name,
        finishedAt: @finished_at,
        duration: @duration,
        status: @status
      }
    end

    private

    def build_status(last_build, result)
      return "running" if build_running?(last_build)
      results = { success: "success", failure: "failure" }
      results[result.to_sym]
    end

    def build_running?(build)
      return build.fetch("building") { false } if build
      false
    end
  end
end
