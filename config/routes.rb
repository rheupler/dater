Rails.application.routes.draw do
  devise_for :users
  root 'matches#index'
end
