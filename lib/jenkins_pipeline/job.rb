module JenkinsPipeline
  class Job
    attr_reader :name, :ci_name, :duration, :timestamp, :number
    attr_writer :result

    def initialize job_hash
      @name = job_hash["name"]
      @ci_name = job_hash["ci_name"]
      @result = job_hash["lastCompletedBuild"]["result"].downcase
      @last_build = job_hash["lastBuild"]
      @duration = job_hash["lastCompletedBuild"]["duration"]
      @timestamp = job_hash["lastCompletedBuild"]["timestamp"]
      @number = job_hash["lastCompletedBuild"]["number"]
      @revisions = job_hash["lastCompletedBuild"]["changeSet"]["revisions"] || []
    end

    def result_class
      return "warning progress-bar-striped active" if last_build_running?
      to_result_class @result
    end

    def revision
      @revisions.first["revision"] if @revisions.any?
    end

    private

    def last_build_running?
      return @last_build.fetch("building") { false } if @last_build
      false
    end

    def to_result_class result
      results = { success: "success", failure: "danger" }
      results[result.to_sym]
    end
  end
end