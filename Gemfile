source 'https://rubygems.org'
ruby '2.1.4'
gem 'rails', '4.1.7'
gem 'pg'
gem 'prawn'
gem 'prawn-table'
gem 'sass-rails', '~> 4.0.3'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.0.0'
gem 'aasm'
gem 'jquery-rails'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0',          group: :doc
gem 'spring',        group: :development
gem 'bower-rails'
gem 'angular-rails-templates', '~>0.1'
gem 'validates_timeliness', '~> 3.0'
gem 'activerecord-import'

group :production, :staging do
  gem "rails_12factor"
  gem "rails_stdout_logging"
  gem "rails_serve_static_assets"
end

group :development, :test do
  gem 'rspec-rails', '~> 3.1'
  gem 'byebug'
end

group :test do
  gem 'capybara', '~> 2.4.4'
  gem 'factory_girl_rails'
  gem 'api_matchers'
  gem 'database_cleaner'
  gem 'shoulda-matchers', require: false
end

