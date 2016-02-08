module JenkinsPipeline
  class Configuration


    def pipelines
      @pipelines ||= files
    end

    def pipelines_ids
      pipelines.map { |pipeline| pipeline["id"] }
    end

    private

    def files
      Dir["config/*.yml"].map do |file|
        YAML.load_file(file)
      end
    end

  end
end