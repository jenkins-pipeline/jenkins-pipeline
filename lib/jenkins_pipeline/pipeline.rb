module JenkinsPipeline
  class Pipeline

    attr_reader :revision, :name

    def initialize name
      @name = name
      @revision = 0
      @jobs = []
    end

    def add_job job, first=false
      @revision = job.revision if first
      @jobs << job
    end

  end
end