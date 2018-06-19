require "json"

# Evaluate arbitrary code.
# Unbelievably insecure.
class CodeController < ApplicationController
  skip_before_action :verify_authenticity_token

  def evaluate
    if params[:system] == "slim"
      result = ActiveRecord::Base.connection.select_all(params[:code])

      # This returns a SQL result in pretty-close-to-CSV format
      render plain: [
        result.columns.join(","),
        result.rows.map {|row| row.join(",") },
      ].join("\n")
    elsif params[:system] == "accupacDatabase"
      sample_data = File.read(Rails.root.join("../data.json"))
      sample_id = params[:code].scan(/q\d{6}/i).last.upcase

      render plain: [
        sample_data.lines.first,
        sample_data.lines.find {|line| line.start_with?(sample_id) }
      ].join
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
end
