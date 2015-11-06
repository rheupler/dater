Rails.application.routes.draw do
  devise_for :users
  root 'matches#index'
end

page.css('.sortable').xpath('//tr').xpath('//td').css('.image')[0]
