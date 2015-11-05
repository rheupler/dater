Rails.application.routes.draw do
  devise_for :users
  root 'matching#index'
end
