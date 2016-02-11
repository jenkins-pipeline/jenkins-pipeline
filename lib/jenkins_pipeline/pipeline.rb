module JenkinsPipeline
  class Pipeline

    attr_reader :revision, :id, :name, :jobs

    def initialize(id, name)
      @id = id
      @name = name
      @revision = 0
      @jobs = []
    end

    def add_job job, first=false
      @revision = job.revision if first
      @jobs << job
    end

    def serialize
      {
        id: @id,
        name: @name,
        revision: @revision,
        jobs: @jobs.map(&:serialize)
      }
    end
  end
end
