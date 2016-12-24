require 'sinatra/base'

class HangmanApp < Sinatra::Base
  get '/' do
    erb :index
  end
end

HangmanApp.run!
