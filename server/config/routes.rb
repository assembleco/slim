Rails.application.routes.draw do
  post "/evaluate", to: "code#evaluate"
end
