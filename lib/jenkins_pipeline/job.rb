module JenkinsPipeline
  class Job
    attr_reader :name, :result, :ci_name, :duration, :timestamp, :number, :ran

    def initialize job_hash, name, result, ran
      @name = name
      @ci_name = job_hash["name"]
      @result = result.empty? ? job_hash["lastCompletedBuild"]["result"].downcase : result
      @last_build = job_hash["lastBuild"]
      @duration = job_hash["lastCompletedBuild"]["duration"]
      @timestamp = job_hash["lastCompletedBuild"]["timestamp"]
      @number = job_hash["lastCompletedBuild"]["number"]
      @revisions = job_hash["lastCompletedBuild"]["changeSet"]["revisions"] || []
      @ran = ran
    end

    def result_class
      return "warning progress-bar-striped active" if last_build_running?
      to_result_class @result
    end

    def revision
      @revisions.first["revision"] if @revisions.any?
    end

    def serialize
      {
        name: @name,
        ci_name: @ci_name,
        timestamp: @timestamp,
        duration: @duration,
        ran: @ran,
        number: @number,
        last_build: result_class
      }
    end

    private

    def last_build_running?
      return @last_build.fetch("building") { false } if @last_build
      false
    end

    def to_result_class result
      results = { success: "success", failure: "danger" }
      result_class = results[result.to_sym]
      result_class.nil? ? result : result_class
    end
  end
end
