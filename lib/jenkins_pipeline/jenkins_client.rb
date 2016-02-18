module JenkinsPipeline
  class JenkinsClient

    def all_jobs_from pipeline
      uri = create_uri(pipeline)
      http = Net::HTTP.new(uri.host, uri.port)
      if uri.scheme == "https"
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      end
      request = Net::HTTP::Get.new(uri.request_uri)
      request.basic_auth(username, token)
      response = http.request(request)
      JSON.parse(response.body)
    end

    private

    def username
      @username ||= ENV["MONITOR_USERNAME"]
    end

    def token
      @token ||= ENV["MONITOR_TOKEN"]
    end

    def create_uri(pipeline)
      if pipeline.fetch("folder") {false}
        root_url = "#{pipeline['root_url']}/job/#{pipeline['folder']}/api/json"
      else
        root_url = "#{pipeline['root_url']}/api/json"
      end
      URI.parse("#{root_url}?tree=jobs[name,lastBuild[building],lastCompletedBuild[number,duration,timestamp,result,changeSet[revisions[revision]{0,1}]]]")
    end
  end
end
