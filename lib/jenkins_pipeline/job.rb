module JenkinsPipeline
  class Job
    attr_reader :name, :status, :ci_name, :duration, :finished_at, :number

    def initialize(job_hash, name, upstream_status)
      @name = name
      @ci_name = job_hash["name"]
      @last_build = job_hash["lastBuild"]
      @result = job_hash["lastCompletedBuild"]["result"].downcase
      @upstream_status = upstream_status
      @status = build_status
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

    def build_status
      return "unknown" unless @upstream_status == "success"
      return "running" if build_running?(@last_build)
      @result
    end

    def build_running?(build)
      return build.fetch("building") { false } if build
      false
    end
  end
end
