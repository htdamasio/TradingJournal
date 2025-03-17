Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://127.0.0.1:5173", "http://localhost:5173"
    resource "*", headers: :any, methods: [ :get, :post, :put, :patch, :delete, :options, :head ], credentials: true
  end

  # allow do
  #   origins "https://trading-journal.herokuapp.com"
  #   resource "*", headers: :any, methods: [ :get, :post, :put, :patch, :delete, :options, :head ], credentials: true
  # end
end
