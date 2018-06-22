require "json"
require "docker"

# Evaluate arbitrary code.
# Unbelievably insecure.
class CodeController < ApplicationController
  skip_before_action :verify_authenticity_token

  def evaluate
    if params[:system] == "slim"
      result = ActiveRecord::Base.connection.select_all(params[:code])

      # This returns a SQL result in pretty-close-to-CSV format
      render plain: [
        result.columns.join("\t"),
        result.rows.map {|row| row.join("\t") },
      ].join("\n")

    elsif params[:system] == "accupacDatabase"

      Dir.mktmpdir do |dir|
        File.write("#{dir}/Dockerfile", <<-DOCKERFILE.strip_heredoc)
        FROM linuxbrew/linuxbrew:latest
        RUN brew install freetds --with-msdblib
        DOCKERFILE

        image = Docker::Image.build_from_dir(dir)

        container = Docker::Container.create(
          # "Env" => container_env_variables,
          "Image" => image.id,
          "Tty" => true,
        )

        container.start

        stdout, stderr, exit_status = container.exec(
          "tsql -S #{secret(:server)}:#{secret(:port)} -U #{secret(:username)} -P #{secret(:password)} -D #{secret(:database)}".split(" "),
          stdin: StringIO.new(params[:code] + ";\ngo\n"),
        )

        container.stop
        container.delete

        render plain: stdout.join
      end

    elsif params[:system] == "ActiveDirectory"

      # TODO
      render json: true

    else
      render json: eval(params[:code])
    end
  end

  private

  def params
    super.permit(:code, :system)
  end

  def secret(name)
    env_variable = "SECRET_#{params[:system]}_#{name}"
    ENV.fetch(env_variable)
  end
end
